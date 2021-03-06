window.swaggerSpec={
  "swagger" : "2.0",
  "info" : {
    "description" : "OperatorFabric ThirdParty Management API",
    "version" : "1.2.0.SNAPSHOT",
    "title" : "Action handling",
    "termsOfService" : "",
    "contact" : {
      "email" : "opfab_AT_lists.lfenergy.org",
      "url" : "https://opfab.github.io/"
    },
    "license" : {
      "name" : "Mozilla Public License V2.0",
      "url" : "http://mozilla.org/MPL/2.0/"
    }
  },
  "host" : "localhost",
  "basePath" : "/apis",
  "tags" : [ {
    "name" : "actions",
    "description" : "Everything concerning specified Action"
  } ],
  "schemes" : [ "http" ],
  "paths" : {
    "/publisher/{publisher}/process/{processInstanceId}/states/{state}/actions/{actionKey}" : {
      "get" : {
        "tags" : [ "actions" ],
        "summary" : "Get action associated to process with updated status",
        "description" : "Get action associated with Third+process+state, returns an array of actions (application/json)",
        "operationId" : "getAction",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "processInstanceId",
          "in" : "path",
          "description" : "Process instance unique id",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "state",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "actionKey",
          "in" : "path",
          "description" : "key of action (unique for state)",
          "required" : true,
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/ActionStatus"
            }
          },
          "400" : {
            "description" : "Submitted data are incorrect."
          },
          "404" : {
            "description" : "No such Process, State, Action or correctly responding third party endpoint"
          },
          "502" : {
            "description" : "Error while accessing other business service or third party endpoint"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      },
      "post" : {
        "tags" : [ "actions" ],
        "summary" : "Post action associated to process",
        "description" : "Post action associated with process and state return action with updated status",
        "operationId" : "triggerAction",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "processInstanceId",
          "in" : "path",
          "description" : "Process instance unique id",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "state",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "actionKey",
          "in" : "path",
          "description" : "key of action (unique for state)",
          "required" : true,
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/ActionStatus"
            }
          },
          "400" : {
            "description" : "Submitted data are incorrect."
          },
          "404" : {
            "description" : "No such Process, State, Action or correctly responding third party endpoint"
          },
          "502" : {
            "description" : "Error while accessing other business service or third party endpoint"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    }
  },
  "definitions" : {
    "ActionEnum" : {
      "type" : "string",
      "description" : "Action type >\n* EXTERNAL - Not defined (not implemented)\n* URL - The action is tied to a url which must conform the specification of 3rd Party actions (see reference manual)\n* JNLP - The action triggers a JNLP link (not implemented)",
      "enum" : [ "EXTERNAL", "URL", "JNLP" ],
      "example" : "URL"
    },
    "I18n" : {
      "type" : "object",
      "description" : "describes an i18n label",
      "properties" : {
        "key" : {
          "type" : "string",
          "description" : "i18n client side key"
        },
        "parameters" : {
          "type" : "object",
          "description" : "Optional parameters",
          "additionalProperties" : {
            "type" : "string"
          }
        }
      },
      "example" : {
        "key" : "title",
        "parameters" : {
          "EN" : "My Title",
          "FR" : "Mon Titre"
        }
      }
    },
    "Action" : {
      "description" : "defines an action on the business process associated to the card",
      "type" : "object",
      "properties" : {
        "type" : {
          "description" : "Action type",
          "$ref" : "#/definitions/ActionEnum"
        },
        "url" : {
          "description" : "Url of remote service entry point",
          "type" : "string"
        },
        "lockAction" : {
          "type" : "boolean",
          "default" : false,
          "description" : "if true, action will be locked after clicked client-side"
        },
        "called" : {
          "type" : "boolean",
          "default" : false,
          "readOnly" : true,
          "description" : "True if action has already been called at least once"
        },
        "updateStateBeforeAction" : {
          "type" : "boolean",
          "default" : false,
          "description" : "if true, client will attempt an update of ActionStatus before execution"
        },
        "hidden" : {
          "type" : "boolean",
          "default" : false,
          "description" : "This action is hidden from card and is only available to details;"
        },
        "buttonStyle" : {
          "type" : "string",
          "description" : "css classes of action button"
        },
        "label" : {
          "description" : "button default label, appears as a tooltip",
          "$ref" : "#/definitions/I18n"
        }
      },
      "required" : [ "type", "label" ],
      "example" : {
        "type" : "URL",
        "lockAction" : true,
        "called" : false,
        "updateStateBeforeAction" : false,
        "hidden" : true,
        "buttonStyle" : "buttonClass",
        "label" : {
          "key" : "myCard.myAction.label",
          "parameters" : {
            "EN" : "Choose colour",
            "FR" : "Choisir une couleur"
          }
        }
      }
    },
    "ActionStatus" : {
      "description" : "a refined view of an action to update its client side behavior",
      "type" : "object",
      "properties" : {
        "lockAction" : {
          "type" : "boolean",
          "default" : false,
          "description" : "if true, action will be locked after clicked client-side"
        },
        "updateStateBeforeAction" : {
          "type" : "boolean",
          "default" : false,
          "description" : "if true, client will attempt an update of ActionStatus before execution"
        },
        "buttonStyle" : {
          "type" : "string",
          "description" : "css classes of action button"
        },
        "label" : {
          "description" : "button default label, appears as a tooltip",
          "$ref" : "#/definitions/I18n"
        }
      },
      "required" : [ "type", "label" ],
      "example" : {
        "lockAction" : true,
        "updateStateBeforeAction" : false,
        "hidden" : true,
        "buttonStyle" : "buttonClass",
        "label" : {
          "key" : "myCard.myAction.label",
          "parameters" : {
            "EN" : "Choose colour",
            "FR" : "Choisir une couleur"
          }
        }
      }
    }
  }
}
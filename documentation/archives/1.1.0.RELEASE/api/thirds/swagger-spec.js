window.swaggerSpec={
  "swagger" : "2.0",
  "info" : {
    "description" : "OperatorFabric ThirdParty Management API",
    "version" : "1.2.0.SNAPSHOT",
    "title" : "Thirds Management",
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
    "name" : "thirds",
    "description" : "Everything concerning specified Third"
  } ],
  "schemes" : [ "http" ],
  "paths" : {
    "/thirds" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "List existing Thirds",
        "description" : "List existing Thirds",
        "operationId" : "getThirds",
        "produces" : [ "application/json" ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/Third"
              }
            }
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      },
      "post" : {
        "tags" : [ "thirds" ],
        "summary" : "Uploads Third configuration bundle",
        "description" : "Uploads Third configuration bundle. Bundle is a gzipped tarball (tar.gz) containing a config.json file and resource file using the following layout:\n```\n└──css\n└──i18n\n│   └──en.json\n│   └──fr.json\n│   └...\n└──template\n│   └──en\n│   |  └──emergency.handlebars\n│   |  └──info.handlebars\n│   └──fr\n│   |  └──emergency.handlebars\n│   |  └──info.handlebars\n│   └...\n└──config.json\n```\nThe config.json file contains a Third object in json notation (see [Models](#__Models))",
        "operationId" : "uploadBundle",
        "consumes" : [ "multipart/form-data" ],
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "file",
          "in" : "formData",
          "description" : "file to upload",
          "required" : true,
          "type" : "file"
        } ],
        "responses" : {
          "201" : {
            "description" : "Successful creation",
            "schema" : {
              "$ref" : "#/definitions/Third"
            }
          },
          "401" : {
            "description" : "Authentication required"
          },
          "403" : {
            "description" : "Forbidden - ADMIN role necessary"
          }
        }
      }
    },
    "/thirds/{thirdName}" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Access existing Third data",
        "description" : "Access existing Third data",
        "operationId" : "getThird",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of template (defaults to latest)",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/Third"
            }
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/thirds/{thirdName}/templates/{templateName}" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get existing template associated with Third",
        "description" : "Get template associated with Third, if file exists return file (application/handlebars) otherwise return error message (application/json)",
        "operationId" : "getTemplate",
        "produces" : [ "application/json", "application/handlebars" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "locale",
          "in" : "query",
          "description" : "Locale iso code",
          "required" : false,
          "type" : "string"
        }, {
          "name" : "templateName",
          "in" : "path",
          "description" : "Name of template to retrieve (w.o. extension)",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of template (defaults to latest)",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "string",
              "format" : "binary"
            }
          },
          "404" : {
            "description" : "No such template"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/thirds/{thirdName}/css/{cssFileName}" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get css file associated with Third",
        "description" : "Get css file associated with Third, if file exists return file (text/css) otherwise return error message (application/json)",
        "operationId" : "getCss",
        "produces" : [ "application/json", "text/css" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "cssFileName",
          "in" : "path",
          "description" : "Name of stylesheet file to retrieve (w.o. extension)",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of stylesheet (defaults to latest)",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "string",
              "format" : "binary"
            }
          },
          "404" : {
            "description" : "No such template"
          }
        }
      }
    },
    "/thirds/{thirdName}/i18n" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get i18n file associated with Third",
        "description" : "Get i18n file associated with Third, if file exists return file (text/plain) otherwise return error message (application/json)",
        "operationId" : "getI18n",
        "produces" : [ "application/json", "text/plain" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "locale",
          "in" : "query",
          "description" : "Locale iso code",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "version",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of i18n (defaults to latest)",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "string",
              "format" : "binary"
            }
          },
          "404" : {
            "description" : "No such template"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/thirds/{thirdName}/{process}/{state}/details" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get details associated to thirds",
        "description" : "Get details associated with Third+process+state, returns an array of details (application/json)",
        "operationId" : "getDetails",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "process",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "state",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "apiVersion",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of third",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/Detail"
              }
            }
          },
          "404" : {
            "description" : "No such third"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/thirds/{thirdName}/{process}/{state}/actions" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get actions associated to thirds",
        "description" : "Get actions associated with Third+process+state, returns an array of actions (application/json)",
        "operationId" : "getActions",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "process",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "state",
          "in" : "path",
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "apiVersion",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of third",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "type" : "object",
              "additionalProperties" : {
                "$ref" : "#/definitions/Action"
              }
            }
          },
          "404" : {
            "description" : "No such third"
          },
          "401" : {
            "description" : "Authentication required"
          }
        }
      }
    },
    "/thirds/{thirdName}/{process}/{state}/actions/{actionKey}" : {
      "get" : {
        "tags" : [ "thirds" ],
        "summary" : "Get actions associated to thirds",
        "description" : "Get actions associated with Third+process+state, returns an array of actions (application/json)",
        "operationId" : "getAction",
        "produces" : [ "application/json" ],
        "parameters" : [ {
          "name" : "thirdName",
          "in" : "path",
          "description" : "Name of Third to retrieve",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "process",
          "in" : "path",
          "description" : "Name of state",
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
          "description" : "Name of state",
          "required" : true,
          "type" : "string"
        }, {
          "name" : "apiVersion",
          "in" : "query",
          "required" : false,
          "description" : "Expected version of third",
          "type" : "string"
        } ],
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/definitions/Action"
            }
          },
          "404" : {
            "description" : "No such third"
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
    "ThirdMenuEntry" : {
      "type" : "object",
      "properties" : {
        "id" : {
          "type" : "string",
          "description" : "unique identifier of this menu item for the current third service"
        },
        "url" : {
          "type" : "string",
          "description" : "url of the endpoint for this menu item"
        },
        "label" : {
          "type" : "string",
          "description" : "i18n key for the label of this menu item. The value attached to this key should be defined in each XX.json file in the i18n folder of the bundle (where XX stands for the locale iso code, for example 'EN')"
        }
      }
    },
    "Third" : {
      "type" : "object",
      "description" : "Third party business module configuration. Models Third party properties and list referenced resources.",
      "properties" : {
        "name" : {
          "type" : "string",
          "description" : "Third party business module name"
        },
        "version" : {
          "type" : "string",
          "description" : "Third party business module configuration version"
        },
        "templates" : {
          "type" : "array",
          "description" : "List of templates name (without extension)",
          "example" : "\"emergency\", \"security\"",
          "items" : {
            "type" : "string"
          }
        },
        "csses" : {
          "type" : "array",
          "description" : "List of css file names (without extension)",
          "example" : "tab-style",
          "items" : {
            "type" : "string"
          }
        },
        "i18nLabelKey" : {
          "description" : "i18n key for the label of this Third The value attached to this key should be defined in each XX.json file in the i18n folder of the bundle (where XX stands for the locale iso code, for example 'EN')",
          "type" : "string"
        },
        "menuEntries" : {
          "type" : "array",
          "description" : "describes the menu items to add to UI navbar",
          "items" : {
            "$ref" : "#/definitions/ThirdMenuEntry"
          }
        },
        "processes" : {
          "type" : "object",
          "additionalProperties" : {
            "type" : "object",
            "properties" : {
              "states" : {
                "type" : "object",
                "additionalProperties" : {
                  "type" : "object",
                  "properties" : {
                    "details" : {
                      "type" : "array",
                      "description" : "List of card associated details",
                      "items" : {
                        "$ref" : "#/definitions/Detail"
                      }
                    },
                    "actions" : {
                      "type" : "object",
                      "description" : "Map of actions, identifying an action by its unique card related id",
                      "additionalProperties" : {
                        "$ref" : "#/definitions/Action"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "required" : [ "name", "version" ],
      "example" : {
        "name" : "My ThirdParty Application",
        "version" : "v1.0",
        "templates" : [ "emergency", "info" ],
        "csses" : [ "tab-style", "content-style" ],
        "i18nLabelKey" : "myThirdPartyApp.label",
        "menuEntries" : [ {
          "id" : "website",
          "url" : "http://www.mythirdpartyapp.com",
          "label" : "menu.website"
        }, {
          "id" : "status",
          "url" : "http://www.mythirdpartyapp.com/status",
          "label" : "menu.status"
        } ],
        "processes" : {
          "process1" : {
            "state1" : {
              "details" : [ {
                "title" : {
                  "key" : "template.title",
                  "parameters" : {
                    "param" : "value"
                  }
                },
                "titleStyle" : "titleClass",
                "templateName" : "template1"
              } ],
              "actions" : {
                "action1" : {
                  "type" : "URL",
                  "lockAction" : true,
                  "called" : false,
                  "updateStateBeforeAction" : false,
                  "hidden" : true,
                  "buttonStyle" : "buttonClass",
                  "label" : {
                    "key" : "my.card.my.action.label"
                  }
                }
              }
            },
            "state2" : {
              "details" : [ {
                "title" : {
                  "key" : "template2.title",
                  "parameters" : {
                    "param" : "value"
                  }
                },
                "titleStyle" : "titleClass2",
                "templateName" : "template2",
                "styles" : [ "my-template.css" ]
              } ]
            }
          },
          "process2" : {
            "state1" : {
              "details" : [ {
                "title" : {
                  "key" : "template.title",
                  "parameters" : {
                    "param" : "value"
                  }
                },
                "titleStyle" : "titleClass",
                "templateName" : "template3",
                "styles" : [ "my-template.css" ]
              } ]
            },
            "state2" : {
              "details" : [ {
                "title" : {
                  "key" : "template2.title",
                  "parameters" : {
                    "param" : "value"
                  }
                },
                "titleStyle" : "titleClass2",
                "templateName" : "template4",
                "styles" : ""
              } ]
            }
          }
        }
      }
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
    "Detail" : {
      "description" : "detail defines html data rendering",
      "type" : "object",
      "properties" : {
        "title" : {
          "description" : "Card i18n title",
          "$ref" : "#/definitions/I18n"
        },
        "titleStyle" : {
          "description" : "css classes applied to title",
          "type" : "string"
        },
        "templateName" : {
          "description" : "template unique name as defined by Third Party Bundle in Third Party Service",
          "type" : "string"
        },
        "styles" : {
          "description" : "css files names to load as defined by Third Party Bundle in Third Party Service",
          "type" : "array",
          "items" : {
            "type" : "string"
          }
        }
      },
      "example" : {
        "title" : {
          "key" : "template.title",
          "parameters" : {
            "param" : "value"
          }
        },
        "titleStyle" : "titleClass",
        "templateName" : "template1",
        "styles" : [ "bundleTest.css", "otherStyle.css" ]
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
    }
  }
}
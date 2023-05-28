"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.0.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          require: "./lib/main.js",
          types: "./lib/main.d.ts",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^17.0.9",
        decache: "^4.6.1",
        dtslint: "^3.7.0",
        sinon: "^12.0.1",
        standard: "^16.0.4",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.3.2",
        tap: "^15.1.6",
        tar: "^6.1.11",
        typescript: "^4.5.4"
      },
      engines: {
        node: ">=12"
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config,
      parse
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module2) {
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    module2.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module2) {
    var re = /^dotenv_config_(encoding|path|debug|override)=(.+)$/;
    module2.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/server.ts
var import_fastify = __toESM(require("fastify"), 1);
var import_cors = __toESM(require("@fastify/cors"), 1);

// src/routes/server.ts
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/server.ts
async function serverRoutes(app2) {
  app2.get("/user", async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        login: user.login
      };
    });
  });
  app2.get("/user/:id", async (request) => {
    const paramsSchema = import_zod.z.object({
      id: (0, import_zod.string)().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    });
    return user;
  });
  app2.post("/user", async (request) => {
    const bodySchema = import_zod.z.object({
      name: (0, import_zod.string)(),
      login: (0, import_zod.string)(),
      password: (0, import_zod.string)(),
      email: (0, import_zod.string)(),
      cpf: (0, import_zod.string)(),
      dataNasc: import_zod.z.coerce.date()
    });
    const {
      login,
      email,
      name,
      password,
      cpf,
      dataNasc
    } = bodySchema.parse(request.body);
    await prisma.user.create({
      data: {
        login,
        email,
        name,
        password,
        cpf,
        dataNasc
      }
    });
    const userCreatorSuccess = { login, email, name, cpf, dataNasc };
    return userCreatorSuccess;
  });
  app2.put("/user/:id", async (request) => {
    const paramsSchema = import_zod.z.object({
      id: (0, import_zod.string)().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod.z.object({
      name: (0, import_zod.string)(),
      login: (0, import_zod.string)(),
      password: (0, import_zod.string)(),
      email: (0, import_zod.string)(),
      cpf: (0, import_zod.string)(),
      dataNasc: import_zod.z.coerce.date()
    });
    const {
      name,
      login,
      password,
      email,
      cpf,
      dataNasc
    } = bodySchema.parse(request.body);
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        login,
        password,
        email,
        cpf,
        dataNasc
      }
    });
    return user;
  });
  app2.delete("/user/:id", async (request) => {
    const paramsSchema = import_zod.z.object({
      id: (0, import_zod.string)().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    await prisma.user.delete({
      where: {
        id
      }
    });
  });
}

// src/server.ts
var import_jwt = __toESM(require("@fastify/jwt"), 1);

// src/env.ts
var import_zod2 = require("zod");
var envSchema = import_zod2.z.object({
  API_PORT: import_zod2.z.coerce.number()
});
var getEnv = envSchema.safeParse(process.env);
if (!getEnv.success) {
  const errorMessage = "load environment failed";
  console.error(errorMessage, getEnv.error.format());
  throw new Error(errorMessage);
}
var env = getEnv.data;

// src/server.ts
var app = (0, import_fastify.default)();
app.register(import_jwt.default, {
  secret: "kfsdjfkldsflkdsngklvazflds\xE7gnmkkodsaofjx\xE7l"
});
app.register(import_cors.default, {
  origin: true
});
app.register(serverRoutes);
app.listen({
  port: env.API_PORT,
  host: "0.0.0.0"
}).then(() => {
  console.log(`\u{1F680} HTTP server running on port http://localhost:${env.API_PORT}`);
});

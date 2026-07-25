var setTimeout = function (callback, milliseconds) { return birc.setTimeout(callback, milliseconds); };
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
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

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/crypto-js/core.js
  var require_core = __commonJS({
    "node_modules/crypto-js/core.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory();
        } else if (typeof define === "function" && define.amd) {
          define([], factory);
        } else {
          root.CryptoJS = factory();
        }
      })(exports, function() {
        var CryptoJS2 = CryptoJS2 || function(Math2, undefined2) {
          var crypto2;
          if (typeof window !== "undefined" && window.crypto) {
            crypto2 = window.crypto;
          }
          if (typeof self !== "undefined" && self.crypto) {
            crypto2 = self.crypto;
          }
          if (typeof globalThis !== "undefined" && globalThis.crypto) {
            crypto2 = globalThis.crypto;
          }
          if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
            crypto2 = window.msCrypto;
          }
          if (!crypto2 && typeof global !== "undefined" && global.crypto) {
            crypto2 = global.crypto;
          }
          if (!crypto2 && typeof __require === "function") {
            try {
              crypto2 = require_crypto();
            } catch (err) {
            }
          }
          var cryptoSecureRandomInt = function() {
            if (crypto2) {
              if (typeof crypto2.getRandomValues === "function") {
                try {
                  return crypto2.getRandomValues(new Uint32Array(1))[0];
                } catch (err) {
                }
              }
              if (typeof crypto2.randomBytes === "function") {
                try {
                  return crypto2.randomBytes(4).readInt32LE();
                } catch (err) {
                }
              }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || /* @__PURE__ */ function() {
            function F() {
            }
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = /* @__PURE__ */ function() {
            return {
              /**
               * Creates a new object that inherits from this object.
               *
               * @param {Object} overrides Properties to copy into the new object.
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         field: 'value',
               *
               *         method: function () {
               *         }
               *     });
               */
              extend: function(overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                  subtype.init = function() {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              /**
               * Extends this object and runs the init method.
               * Arguments to create() will be passed to init().
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var instance = MyType.create();
               */
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              /**
               * Initializes a newly created object.
               * Override this method to add some logic when your objects are created.
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         init: function () {
               *             // ...
               *         }
               *     });
               */
              init: function() {
              },
              /**
               * Copies properties into this object.
               *
               * @param {Object} properties The properties to mix in.
               *
               * @example
               *
               *     MyType.mixIn({
               *         field: 'value'
               *     });
               */
              mixIn: function(properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty("toString")) {
                  this.toString = properties.toString;
                }
              },
              /**
               * Creates a copy of this object.
               *
               * @return {Object} The clone.
               *
               * @example
               *
               *     var clone = instance.clone();
               */
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of 32-bit words.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.create();
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined2) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            /**
             * Converts this word array to a string.
             *
             * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
             *
             * @return {string} The stringified word array.
             *
             * @example
             *
             *     var string = wordArray + '';
             *     var string = wordArray.toString();
             *     var string = wordArray.toString(CryptoJS.enc.Utf8);
             */
            toString: function(encoder) {
              return (encoder || Hex).stringify(this);
            },
            /**
             * Concatenates a word array to this word array.
             *
             * @param {WordArray} wordArray The word array to append.
             *
             * @return {WordArray} This word array.
             *
             * @example
             *
             *     wordArray1.concat(wordArray2);
             */
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                  var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
              } else {
                for (var j = 0; j < thatSigBytes; j += 4) {
                  thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            /**
             * Removes insignificant bits.
             *
             * @example
             *
             *     wordArray.clamp();
             */
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math2.ceil(sigBytes / 4);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {WordArray} The clone.
             *
             * @example
             *
             *     var clone = wordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            /**
             * Creates a word array filled with random bytes.
             *
             * @param {number} nBytes The number of random bytes to generate.
             *
             * @return {WordArray} The random word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.random(16);
             */
            random: function(nBytes) {
              var words = [];
              for (var i = 0; i < nBytes; i += 4) {
                words.push(cryptoSecureRandomInt());
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            /**
             * Converts a word array to a hex string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The hex string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
              }
              return hexChars.join("");
            },
            /**
             * Converts a hex string to a word array.
             *
             * @param {string} hexStr The hex string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
             */
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            /**
             * Converts a word array to a Latin1 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Latin1 string.
             *
             * @static
             *
             * @example
             *
             *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            /**
             * Converts a Latin1 string to a word array.
             *
             * @param {string} latin1Str The Latin1 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
             */
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            /**
             * Converts a word array to a UTF-8 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-8 string.
             *
             * @static
             *
             * @example
             *
             *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
             */
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            /**
             * Converts a UTF-8 string to a word array.
             *
             * @param {string} utf8Str The UTF-8 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
             */
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
             * Resets this block algorithm's data buffer to its initial state.
             *
             * @example
             *
             *     bufferedBlockAlgorithm.reset();
             */
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            /**
             * Adds new data to this block algorithm's buffer.
             *
             * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
             *
             * @example
             *
             *     bufferedBlockAlgorithm._append('data');
             *     bufferedBlockAlgorithm._append(wordArray);
             */
            _append: function(data) {
              if (typeof data == "string") {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            /**
             * Processes available data blocks.
             *
             * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
             *
             * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
             *
             * @return {WordArray} The processed data.
             *
             * @example
             *
             *     var processedData = bufferedBlockAlgorithm._process();
             *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
             */
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math2.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = bufferedBlockAlgorithm.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             */
            cfg: Base.extend(),
            /**
             * Initializes a newly created hasher.
             *
             * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
             *
             * @example
             *
             *     var hasher = CryptoJS.algo.SHA256.create();
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            /**
             * Resets this hasher to its initial state.
             *
             * @example
             *
             *     hasher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Updates this hasher with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {Hasher} This hasher.
             *
             * @example
             *
             *     hasher.update('message');
             *     hasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            /**
             * Finalizes the hash computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The hash.
             *
             * @example
             *
             *     var hash = hasher.finalize();
             *     var hash = hasher.finalize('message');
             *     var hash = hasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash2 = this._doFinalize();
              return hash2;
            },
            blockSize: 512 / 32,
            /**
             * Creates a shortcut function to a hasher's object interface.
             *
             * @param {Hasher} hasher The hasher to create a helper for.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
             */
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            /**
             * Creates a shortcut function to the HMAC's object interface.
             *
             * @param {Hasher} hasher The hasher to use in this HMAC helper.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
             */
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS2;
      });
    }
  });

  // node_modules/crypto-js/md5.js
  var require_md5 = __commonJS({
    "node_modules/crypto-js/md5.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var T = [];
          (function() {
            for (var i = 0; i < 64; i++) {
              T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
            }
          })();
          var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878
              ]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var M_offset_0 = M[offset + 0];
              var M_offset_1 = M[offset + 1];
              var M_offset_2 = M[offset + 2];
              var M_offset_3 = M[offset + 3];
              var M_offset_4 = M[offset + 4];
              var M_offset_5 = M[offset + 5];
              var M_offset_6 = M[offset + 6];
              var M_offset_7 = M[offset + 7];
              var M_offset_8 = M[offset + 8];
              var M_offset_9 = M[offset + 9];
              var M_offset_10 = M[offset + 10];
              var M_offset_11 = M[offset + 11];
              var M_offset_12 = M[offset + 12];
              var M_offset_13 = M[offset + 13];
              var M_offset_14 = M[offset + 14];
              var M_offset_15 = M[offset + 15];
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              a = FF(a, b, c, d, M_offset_0, 7, T[0]);
              d = FF(d, a, b, c, M_offset_1, 12, T[1]);
              c = FF(c, d, a, b, M_offset_2, 17, T[2]);
              b = FF(b, c, d, a, M_offset_3, 22, T[3]);
              a = FF(a, b, c, d, M_offset_4, 7, T[4]);
              d = FF(d, a, b, c, M_offset_5, 12, T[5]);
              c = FF(c, d, a, b, M_offset_6, 17, T[6]);
              b = FF(b, c, d, a, M_offset_7, 22, T[7]);
              a = FF(a, b, c, d, M_offset_8, 7, T[8]);
              d = FF(d, a, b, c, M_offset_9, 12, T[9]);
              c = FF(c, d, a, b, M_offset_10, 17, T[10]);
              b = FF(b, c, d, a, M_offset_11, 22, T[11]);
              a = FF(a, b, c, d, M_offset_12, 7, T[12]);
              d = FF(d, a, b, c, M_offset_13, 12, T[13]);
              c = FF(c, d, a, b, M_offset_14, 17, T[14]);
              b = FF(b, c, d, a, M_offset_15, 22, T[15]);
              a = GG(a, b, c, d, M_offset_1, 5, T[16]);
              d = GG(d, a, b, c, M_offset_6, 9, T[17]);
              c = GG(c, d, a, b, M_offset_11, 14, T[18]);
              b = GG(b, c, d, a, M_offset_0, 20, T[19]);
              a = GG(a, b, c, d, M_offset_5, 5, T[20]);
              d = GG(d, a, b, c, M_offset_10, 9, T[21]);
              c = GG(c, d, a, b, M_offset_15, 14, T[22]);
              b = GG(b, c, d, a, M_offset_4, 20, T[23]);
              a = GG(a, b, c, d, M_offset_9, 5, T[24]);
              d = GG(d, a, b, c, M_offset_14, 9, T[25]);
              c = GG(c, d, a, b, M_offset_3, 14, T[26]);
              b = GG(b, c, d, a, M_offset_8, 20, T[27]);
              a = GG(a, b, c, d, M_offset_13, 5, T[28]);
              d = GG(d, a, b, c, M_offset_2, 9, T[29]);
              c = GG(c, d, a, b, M_offset_7, 14, T[30]);
              b = GG(b, c, d, a, M_offset_12, 20, T[31]);
              a = HH(a, b, c, d, M_offset_5, 4, T[32]);
              d = HH(d, a, b, c, M_offset_8, 11, T[33]);
              c = HH(c, d, a, b, M_offset_11, 16, T[34]);
              b = HH(b, c, d, a, M_offset_14, 23, T[35]);
              a = HH(a, b, c, d, M_offset_1, 4, T[36]);
              d = HH(d, a, b, c, M_offset_4, 11, T[37]);
              c = HH(c, d, a, b, M_offset_7, 16, T[38]);
              b = HH(b, c, d, a, M_offset_10, 23, T[39]);
              a = HH(a, b, c, d, M_offset_13, 4, T[40]);
              d = HH(d, a, b, c, M_offset_0, 11, T[41]);
              c = HH(c, d, a, b, M_offset_3, 16, T[42]);
              b = HH(b, c, d, a, M_offset_6, 23, T[43]);
              a = HH(a, b, c, d, M_offset_9, 4, T[44]);
              d = HH(d, a, b, c, M_offset_12, 11, T[45]);
              c = HH(c, d, a, b, M_offset_15, 16, T[46]);
              b = HH(b, c, d, a, M_offset_2, 23, T[47]);
              a = II(a, b, c, d, M_offset_0, 6, T[48]);
              d = II(d, a, b, c, M_offset_7, 10, T[49]);
              c = II(c, d, a, b, M_offset_14, 15, T[50]);
              b = II(b, c, d, a, M_offset_5, 21, T[51]);
              a = II(a, b, c, d, M_offset_12, 6, T[52]);
              d = II(d, a, b, c, M_offset_3, 10, T[53]);
              c = II(c, d, a, b, M_offset_10, 15, T[54]);
              b = II(b, c, d, a, M_offset_1, 21, T[55]);
              a = II(a, b, c, d, M_offset_8, 6, T[56]);
              d = II(d, a, b, c, M_offset_15, 10, T[57]);
              c = II(c, d, a, b, M_offset_6, 15, T[58]);
              b = II(b, c, d, a, M_offset_13, 21, T[59]);
              a = II(a, b, c, d, M_offset_4, 6, T[60]);
              d = II(d, a, b, c, M_offset_11, 10, T[61]);
              c = II(c, d, a, b, M_offset_2, 15, T[62]);
              b = II(b, c, d, a, M_offset_9, 21, T[63]);
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
              var nBitsTotalL = nBitsTotal;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash2 = this._hash;
              var H = hash2.words;
              for (var i = 0; i < 4; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash2;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function FF(a, b, c, d, x, s, t) {
            var n = a + (b & c | ~b & d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function GG(a, b, c, d, x, s, t) {
            var n = a + (b & d | c & ~d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + x + t;
            return (n << s | n >>> 32 - s) + b;
          }
          C.MD5 = Hasher._createHelper(MD5);
          C.HmacMD5 = Hasher._createHmacHelper(MD5);
        })(Math);
        return CryptoJS2.MD5;
      });
    }
  });

  // node_modules/crypto-js/sha1.js
  var require_sha1 = __commonJS({
    "node_modules/crypto-js/sha1.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var W = [];
          var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              var e = H[4];
              for (var i = 0; i < 80; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                  W[i] = n << 1 | n >>> 31;
                }
                var t = (a << 5 | a >>> 27) + e + W[i];
                if (i < 20) {
                  t += (b & c | ~b & d) + 1518500249;
                } else if (i < 40) {
                  t += (b ^ c ^ d) + 1859775393;
                } else if (i < 60) {
                  t += (b & c | b & d | c & d) - 1894007588;
                } else {
                  t += (b ^ c ^ d) - 899497514;
                }
                e = d;
                d = c;
                c = b << 30 | b >>> 2;
                b = a;
                a = t;
              }
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
              H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA1 = Hasher._createHelper(SHA1);
          C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
        })();
        return CryptoJS2.SHA1;
      });
    }
  });

  // node_modules/crypto-js/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/crypto-js/sha256.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var H = [];
          var K = [];
          (function() {
            function isPrime(n2) {
              var sqrtN = Math2.sqrt(n2);
              for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n2 % factor)) {
                  return false;
                }
              }
              return true;
            }
            function getFractionalBits(n2) {
              return (n2 - (n2 | 0)) * 4294967296 | 0;
            }
            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
              if (isPrime(n)) {
                if (nPrime < 8) {
                  H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
                nPrime++;
              }
              n++;
            }
          })();
          var W = [];
          var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M, offset) {
              var H2 = this._hash.words;
              var a = H2[0];
              var b = H2[1];
              var c = H2[2];
              var d = H2[3];
              var e = H2[4];
              var f = H2[5];
              var g = H2[6];
              var h = H2[7];
              for (var i = 0; i < 64; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                  var gamma1x = W[i - 2];
                  var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                  W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = e & f ^ ~e & g;
                var maj = a & b ^ a & c ^ b & c;
                var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h = g;
                g = f;
                f = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              H2[0] = H2[0] + a | 0;
              H2[1] = H2[1] + b | 0;
              H2[2] = H2[2] + c | 0;
              H2[3] = H2[3] + d | 0;
              H2[4] = H2[4] + e | 0;
              H2[5] = H2[5] + f | 0;
              H2[6] = H2[6] + g | 0;
              H2[7] = H2[7] + h | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA256 = Hasher._createHelper(SHA256);
          C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
        })(Math);
        return CryptoJS2.SHA256;
      });
    }
  });

  // node_modules/crypto-js/sha224.js
  var require_sha224 = __commonJS({
    "node_modules/crypto-js/sha224.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha256());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha256"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                3238371032,
                914150663,
                812702999,
                4144912697,
                4290775857,
                1750603025,
                1694076839,
                3204075428
              ]);
            },
            _doFinalize: function() {
              var hash2 = SHA256._doFinalize.call(this);
              hash2.sigBytes -= 4;
              return hash2;
            }
          });
          C.SHA224 = SHA256._createHelper(SHA224);
          C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
        })();
        return CryptoJS2.SHA224;
      });
    }
  });

  // node_modules/crypto-js/x64-core.js
  var require_x64_core = __commonJS({
    "node_modules/crypto-js/x64-core.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(undefined2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var X32WordArray = C_lib.WordArray;
          var C_x64 = C.x64 = {};
          var X64Word = C_x64.Word = Base.extend({
            /**
             * Initializes a newly created 64-bit word.
             *
             * @param {number} high The high 32 bits.
             * @param {number} low The low 32 bits.
             *
             * @example
             *
             *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
             */
            init: function(high, low) {
              this.high = high;
              this.low = low;
            }
            /**
             * Bitwise NOTs this word.
             *
             * @return {X64Word} A new x64-Word object after negating.
             *
             * @example
             *
             *     var negated = x64Word.not();
             */
            // not: function () {
            // var high = ~this.high;
            // var low = ~this.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ANDs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to AND with this word.
             *
             * @return {X64Word} A new x64-Word object after ANDing.
             *
             * @example
             *
             *     var anded = x64Word.and(anotherX64Word);
             */
            // and: function (word) {
            // var high = this.high & word.high;
            // var low = this.low & word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to OR with this word.
             *
             * @return {X64Word} A new x64-Word object after ORing.
             *
             * @example
             *
             *     var ored = x64Word.or(anotherX64Word);
             */
            // or: function (word) {
            // var high = this.high | word.high;
            // var low = this.low | word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise XORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to XOR with this word.
             *
             * @return {X64Word} A new x64-Word object after XORing.
             *
             * @example
             *
             *     var xored = x64Word.xor(anotherX64Word);
             */
            // xor: function (word) {
            // var high = this.high ^ word.high;
            // var low = this.low ^ word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the left.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftL(25);
             */
            // shiftL: function (n) {
            // if (n < 32) {
            // var high = (this.high << n) | (this.low >>> (32 - n));
            // var low = this.low << n;
            // } else {
            // var high = this.low << (n - 32);
            // var low = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the right.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftR(7);
             */
            // shiftR: function (n) {
            // if (n < 32) {
            // var low = (this.low >>> n) | (this.high << (32 - n));
            // var high = this.high >>> n;
            // } else {
            // var low = this.high >>> (n - 32);
            // var high = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Rotates this word n bits to the left.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotL(25);
             */
            // rotL: function (n) {
            // return this.shiftL(n).or(this.shiftR(64 - n));
            // },
            /**
             * Rotates this word n bits to the right.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotR(7);
             */
            // rotR: function (n) {
            // return this.shiftR(n).or(this.shiftL(64 - n));
            // },
            /**
             * Adds this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to add with this word.
             *
             * @return {X64Word} A new x64-Word object after adding.
             *
             * @example
             *
             *     var added = x64Word.add(anotherX64Word);
             */
            // add: function (word) {
            // var low = (this.low + word.low) | 0;
            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
            // var high = (this.high + word.high + carry) | 0;
            // return X64Word.create(high, low);
            // }
          });
          var X64WordArray = C_x64.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.x64.WordArray.create();
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ]);
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ], 10);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined2) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 8;
              }
            },
            /**
             * Converts this 64-bit word array to a 32-bit word array.
             *
             * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
             *
             * @example
             *
             *     var x32WordArray = x64WordArray.toX32();
             */
            toX32: function() {
              var x64Words = this.words;
              var x64WordsLength = x64Words.length;
              var x32Words = [];
              for (var i = 0; i < x64WordsLength; i++) {
                var x64Word = x64Words[i];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
              }
              return X32WordArray.create(x32Words, this.sigBytes);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {X64WordArray} The clone.
             *
             * @example
             *
             *     var clone = x64WordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              var words = clone.words = this.words.slice(0);
              var wordsLength = words.length;
              for (var i = 0; i < wordsLength; i++) {
                words[i] = words[i].clone();
              }
              return clone;
            }
          });
        })();
        return CryptoJS2;
      });
    }
  });

  // node_modules/crypto-js/sha512.js
  var require_sha512 = __commonJS({
    "node_modules/crypto-js/sha512.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
          }
          var K = [
            X64Word_create(1116352408, 3609767458),
            X64Word_create(1899447441, 602891725),
            X64Word_create(3049323471, 3964484399),
            X64Word_create(3921009573, 2173295548),
            X64Word_create(961987163, 4081628472),
            X64Word_create(1508970993, 3053834265),
            X64Word_create(2453635748, 2937671579),
            X64Word_create(2870763221, 3664609560),
            X64Word_create(3624381080, 2734883394),
            X64Word_create(310598401, 1164996542),
            X64Word_create(607225278, 1323610764),
            X64Word_create(1426881987, 3590304994),
            X64Word_create(1925078388, 4068182383),
            X64Word_create(2162078206, 991336113),
            X64Word_create(2614888103, 633803317),
            X64Word_create(3248222580, 3479774868),
            X64Word_create(3835390401, 2666613458),
            X64Word_create(4022224774, 944711139),
            X64Word_create(264347078, 2341262773),
            X64Word_create(604807628, 2007800933),
            X64Word_create(770255983, 1495990901),
            X64Word_create(1249150122, 1856431235),
            X64Word_create(1555081692, 3175218132),
            X64Word_create(1996064986, 2198950837),
            X64Word_create(2554220882, 3999719339),
            X64Word_create(2821834349, 766784016),
            X64Word_create(2952996808, 2566594879),
            X64Word_create(3210313671, 3203337956),
            X64Word_create(3336571891, 1034457026),
            X64Word_create(3584528711, 2466948901),
            X64Word_create(113926993, 3758326383),
            X64Word_create(338241895, 168717936),
            X64Word_create(666307205, 1188179964),
            X64Word_create(773529912, 1546045734),
            X64Word_create(1294757372, 1522805485),
            X64Word_create(1396182291, 2643833823),
            X64Word_create(1695183700, 2343527390),
            X64Word_create(1986661051, 1014477480),
            X64Word_create(2177026350, 1206759142),
            X64Word_create(2456956037, 344077627),
            X64Word_create(2730485921, 1290863460),
            X64Word_create(2820302411, 3158454273),
            X64Word_create(3259730800, 3505952657),
            X64Word_create(3345764771, 106217008),
            X64Word_create(3516065817, 3606008344),
            X64Word_create(3600352804, 1432725776),
            X64Word_create(4094571909, 1467031594),
            X64Word_create(275423344, 851169720),
            X64Word_create(430227734, 3100823752),
            X64Word_create(506948616, 1363258195),
            X64Word_create(659060556, 3750685593),
            X64Word_create(883997877, 3785050280),
            X64Word_create(958139571, 3318307427),
            X64Word_create(1322822218, 3812723403),
            X64Word_create(1537002063, 2003034995),
            X64Word_create(1747873779, 3602036899),
            X64Word_create(1955562222, 1575990012),
            X64Word_create(2024104815, 1125592928),
            X64Word_create(2227730452, 2716904306),
            X64Word_create(2361852424, 442776044),
            X64Word_create(2428436474, 593698344),
            X64Word_create(2756734187, 3733110249),
            X64Word_create(3204031479, 2999351573),
            X64Word_create(3329325298, 3815920427),
            X64Word_create(3391569614, 3928383900),
            X64Word_create(3515267271, 566280711),
            X64Word_create(3940187606, 3454069534),
            X64Word_create(4118630271, 4000239992),
            X64Word_create(116418474, 1914138554),
            X64Word_create(174292421, 2731055270),
            X64Word_create(289380356, 3203993006),
            X64Word_create(460393269, 320620315),
            X64Word_create(685471733, 587496836),
            X64Word_create(852142971, 1086792851),
            X64Word_create(1017036298, 365543100),
            X64Word_create(1126000580, 2618297676),
            X64Word_create(1288033470, 3409855158),
            X64Word_create(1501505948, 4234509866),
            X64Word_create(1607167915, 987167468),
            X64Word_create(1816402316, 1246189591)
          ];
          var W = [];
          (function() {
            for (var i = 0; i < 80; i++) {
              W[i] = X64Word_create();
            }
          })();
          var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(1779033703, 4089235720),
                new X64Word.init(3144134277, 2227873595),
                new X64Word.init(1013904242, 4271175723),
                new X64Word.init(2773480762, 1595750129),
                new X64Word.init(1359893119, 2917565137),
                new X64Word.init(2600822924, 725511199),
                new X64Word.init(528734635, 4215389547),
                new X64Word.init(1541459225, 327033209)
              ]);
            },
            _doProcessBlock: function(M, offset) {
              var H = this._hash.words;
              var H0 = H[0];
              var H1 = H[1];
              var H2 = H[2];
              var H3 = H[3];
              var H4 = H[4];
              var H5 = H[5];
              var H6 = H[6];
              var H7 = H[7];
              var H0h = H0.high;
              var H0l = H0.low;
              var H1h = H1.high;
              var H1l = H1.low;
              var H2h = H2.high;
              var H2l = H2.low;
              var H3h = H3.high;
              var H3l = H3.low;
              var H4h = H4.high;
              var H4l = H4.low;
              var H5h = H5.high;
              var H5l = H5.low;
              var H6h = H6.high;
              var H6l = H6.low;
              var H7h = H7.high;
              var H7l = H7.low;
              var ah = H0h;
              var al = H0l;
              var bh = H1h;
              var bl = H1l;
              var ch = H2h;
              var cl = H2l;
              var dh = H3h;
              var dl = H3l;
              var eh = H4h;
              var el = H4l;
              var fh = H5h;
              var fl = H5l;
              var gh = H6h;
              var gl = H6l;
              var hh = H7h;
              var hl = H7l;
              for (var i = 0; i < 80; i++) {
                var Wil;
                var Wih;
                var Wi = W[i];
                if (i < 16) {
                  Wih = Wi.high = M[offset + i * 2] | 0;
                  Wil = Wi.low = M[offset + i * 2 + 1] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0xh = gamma0x.high;
                  var gamma0xl = gamma0x.low;
                  var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                  var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                  var gamma1x = W[i - 2];
                  var gamma1xh = gamma1x.high;
                  var gamma1xl = gamma1x.low;
                  var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                  var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                  var Wi7 = W[i - 7];
                  var Wi7h = Wi7.high;
                  var Wi7l = Wi7.low;
                  var Wi16 = W[i - 16];
                  var Wi16h = Wi16.high;
                  var Wi16l = Wi16.low;
                  Wil = gamma0l + Wi7l;
                  Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                  Wil = Wil + gamma1l;
                  Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                  Wil = Wil + Wi16l;
                  Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                  Wi.high = Wih;
                  Wi.low = Wil;
                }
                var chh = eh & fh ^ ~eh & gh;
                var chl = el & fl ^ ~el & gl;
                var majh = ah & bh ^ ah & ch ^ bh & ch;
                var majl = al & bl ^ al & cl ^ bl & cl;
                var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
                var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
                var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
                var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
                var Ki = K[i];
                var Kih = Ki.high;
                var Kil = Ki.low;
                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = dl + t1l | 0;
                eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = t1l + t2l | 0;
                ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
              }
              H0l = H0.low = H0l + al;
              H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
              H1l = H1.low = H1l + bl;
              H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
              H2l = H2.low = H2l + cl;
              H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
              H3l = H3.low = H3l + dl;
              H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
              H4l = H4.low = H4l + el;
              H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
              H5l = H5.low = H5l + fl;
              H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
              H6l = H6.low = H6l + gl;
              H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
              H7l = H7.low = H7l + hl;
              H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var hash2 = this._hash.toX32();
              return hash2;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            },
            blockSize: 1024 / 32
          });
          C.SHA512 = Hasher._createHelper(SHA512);
          C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
        })();
        return CryptoJS2.SHA512;
      });
    }
  });

  // node_modules/crypto-js/sha384.js
  var require_sha384 = __commonJS({
    "node_modules/crypto-js/sha384.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core(), require_sha512());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core", "./sha512"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          var SHA512 = C_algo.SHA512;
          var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(3418070365, 3238371032),
                new X64Word.init(1654270250, 914150663),
                new X64Word.init(2438529370, 812702999),
                new X64Word.init(355462360, 4144912697),
                new X64Word.init(1731405415, 4290775857),
                new X64Word.init(2394180231, 1750603025),
                new X64Word.init(3675008525, 1694076839),
                new X64Word.init(1203062813, 3204075428)
              ]);
            },
            _doFinalize: function() {
              var hash2 = SHA512._doFinalize.call(this);
              hash2.sigBytes -= 16;
              return hash2;
            }
          });
          C.SHA384 = SHA512._createHelper(SHA384);
          C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
        })();
        return CryptoJS2.SHA384;
      });
    }
  });

  // node_modules/crypto-js/ripemd160.js
  var require_ripemd160 = __commonJS({
    "node_modules/crypto-js/ripemd160.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var _zl = WordArray.create([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            7,
            4,
            13,
            1,
            10,
            6,
            15,
            3,
            12,
            0,
            9,
            5,
            2,
            14,
            11,
            8,
            3,
            10,
            14,
            4,
            9,
            15,
            8,
            1,
            2,
            7,
            0,
            6,
            13,
            11,
            5,
            12,
            1,
            9,
            11,
            10,
            0,
            8,
            12,
            4,
            13,
            3,
            7,
            15,
            14,
            5,
            6,
            2,
            4,
            0,
            5,
            9,
            7,
            12,
            2,
            10,
            14,
            1,
            3,
            8,
            11,
            6,
            15,
            13
          ]);
          var _zr = WordArray.create([
            5,
            14,
            7,
            0,
            9,
            2,
            11,
            4,
            13,
            6,
            15,
            8,
            1,
            10,
            3,
            12,
            6,
            11,
            3,
            7,
            0,
            13,
            5,
            10,
            14,
            15,
            8,
            12,
            4,
            9,
            1,
            2,
            15,
            5,
            1,
            3,
            7,
            14,
            6,
            9,
            11,
            8,
            12,
            2,
            10,
            0,
            4,
            13,
            8,
            6,
            4,
            1,
            3,
            11,
            15,
            0,
            5,
            12,
            2,
            13,
            9,
            7,
            10,
            14,
            12,
            15,
            10,
            4,
            1,
            5,
            8,
            7,
            6,
            2,
            13,
            14,
            0,
            3,
            9,
            11
          ]);
          var _sl = WordArray.create([
            11,
            14,
            15,
            12,
            5,
            8,
            7,
            9,
            11,
            13,
            14,
            15,
            6,
            7,
            9,
            8,
            7,
            6,
            8,
            13,
            11,
            9,
            7,
            15,
            7,
            12,
            15,
            9,
            11,
            7,
            13,
            12,
            11,
            13,
            6,
            7,
            14,
            9,
            13,
            15,
            14,
            8,
            13,
            6,
            5,
            12,
            7,
            5,
            11,
            12,
            14,
            15,
            14,
            15,
            9,
            8,
            9,
            14,
            5,
            6,
            8,
            6,
            5,
            12,
            9,
            15,
            5,
            11,
            6,
            8,
            13,
            12,
            5,
            12,
            13,
            14,
            11,
            8,
            5,
            6
          ]);
          var _sr = WordArray.create([
            8,
            9,
            9,
            11,
            13,
            15,
            15,
            5,
            7,
            7,
            8,
            11,
            14,
            14,
            12,
            6,
            9,
            13,
            15,
            7,
            12,
            8,
            9,
            11,
            7,
            7,
            12,
            7,
            6,
            15,
            13,
            11,
            9,
            7,
            15,
            11,
            8,
            6,
            6,
            14,
            12,
            13,
            5,
            14,
            13,
            13,
            7,
            5,
            15,
            5,
            8,
            11,
            14,
            14,
            6,
            14,
            6,
            9,
            12,
            9,
            12,
            5,
            15,
            8,
            8,
            5,
            12,
            9,
            12,
            5,
            14,
            6,
            8,
            13,
            6,
            5,
            15,
            13,
            11,
            11
          ]);
          var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
              this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function(M, offset) {
              for (var i = 0; i < 16; i++) {
                var offset_i = offset + i;
                var M_offset_i = M[offset_i];
                M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H = this._hash.words;
              var hl = _hl.words;
              var hr = _hr.words;
              var zl = _zl.words;
              var zr = _zr.words;
              var sl = _sl.words;
              var sr = _sr.words;
              var al, bl, cl, dl, el;
              var ar, br, cr, dr, er;
              ar = al = H[0];
              br = bl = H[1];
              cr = cl = H[2];
              dr = dl = H[3];
              er = el = H[4];
              var t;
              for (var i = 0; i < 80; i += 1) {
                t = al + M[offset + zl[i]] | 0;
                if (i < 16) {
                  t += f1(bl, cl, dl) + hl[0];
                } else if (i < 32) {
                  t += f2(bl, cl, dl) + hl[1];
                } else if (i < 48) {
                  t += f3(bl, cl, dl) + hl[2];
                } else if (i < 64) {
                  t += f4(bl, cl, dl) + hl[3];
                } else {
                  t += f5(bl, cl, dl) + hl[4];
                }
                t = t | 0;
                t = rotl(t, sl[i]);
                t = t + el | 0;
                al = el;
                el = dl;
                dl = rotl(cl, 10);
                cl = bl;
                bl = t;
                t = ar + M[offset + zr[i]] | 0;
                if (i < 16) {
                  t += f5(br, cr, dr) + hr[0];
                } else if (i < 32) {
                  t += f4(br, cr, dr) + hr[1];
                } else if (i < 48) {
                  t += f3(br, cr, dr) + hr[2];
                } else if (i < 64) {
                  t += f2(br, cr, dr) + hr[3];
                } else {
                  t += f1(br, cr, dr) + hr[4];
                }
                t = t | 0;
                t = rotl(t, sr[i]);
                t = t + er | 0;
                ar = er;
                er = dr;
                dr = rotl(cr, 10);
                cr = br;
                br = t;
              }
              t = H[1] + cl + dr | 0;
              H[1] = H[2] + dl + er | 0;
              H[2] = H[3] + el + ar | 0;
              H[3] = H[4] + al + br | 0;
              H[4] = H[0] + bl + cr | 0;
              H[0] = t;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash2 = this._hash;
              var H = hash2.words;
              for (var i = 0; i < 5; i++) {
                var H_i = H[i];
                H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash2;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function f1(x, y, z) {
            return x ^ y ^ z;
          }
          function f2(x, y, z) {
            return x & y | ~x & z;
          }
          function f3(x, y, z) {
            return (x | ~y) ^ z;
          }
          function f4(x, y, z) {
            return x & z | y & ~z;
          }
          function f5(x, y, z) {
            return x ^ (y | ~z);
          }
          function rotl(x, n) {
            return x << n | x >>> 32 - n;
          }
          C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
          C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
        })(Math);
        return CryptoJS2.RIPEMD160;
      });
    }
  });

  // node_modules/crypto-js/hmac.js
  var require_hmac = __commonJS({
    "node_modules/crypto-js/hmac.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var C_algo = C.algo;
          var HMAC = C_algo.HMAC = Base.extend({
            /**
             * Initializes a newly created HMAC.
             *
             * @param {Hasher} hasher The hash algorithm to use.
             * @param {WordArray|string} key The secret key.
             *
             * @example
             *
             *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
             */
            init: function(hasher, key) {
              hasher = this._hasher = new hasher.init();
              if (typeof key == "string") {
                key = Utf8.parse(key);
              }
              var hasherBlockSize = hasher.blockSize;
              var hasherBlockSizeBytes = hasherBlockSize * 4;
              if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
              }
              key.clamp();
              var oKey = this._oKey = key.clone();
              var iKey = this._iKey = key.clone();
              var oKeyWords = oKey.words;
              var iKeyWords = iKey.words;
              for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 1549556828;
                iKeyWords[i] ^= 909522486;
              }
              oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
              this.reset();
            },
            /**
             * Resets this HMAC to its initial state.
             *
             * @example
             *
             *     hmacHasher.reset();
             */
            reset: function() {
              var hasher = this._hasher;
              hasher.reset();
              hasher.update(this._iKey);
            },
            /**
             * Updates this HMAC with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {HMAC} This HMAC instance.
             *
             * @example
             *
             *     hmacHasher.update('message');
             *     hmacHasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._hasher.update(messageUpdate);
              return this;
            },
            /**
             * Finalizes the HMAC computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The HMAC.
             *
             * @example
             *
             *     var hmac = hmacHasher.finalize();
             *     var hmac = hmacHasher.finalize('message');
             *     var hmac = hmacHasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              var hasher = this._hasher;
              var innerHash = hasher.finalize(messageUpdate);
              hasher.reset();
              var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
              return hmac;
            }
          });
        })();
      });
    }
  });

  // node_modules/crypto-js/hmac-md5.js
  var require_hmac_md5 = __commonJS({
    "node_modules/crypto-js/hmac-md5.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_md5(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./md5", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        return CryptoJS2.HmacMD5;
      });
    }
  });

  // node_modules/crypto-js/hmac-sha1.js
  var require_hmac_sha1 = __commonJS({
    "node_modules/crypto-js/hmac-sha1.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha1(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha1", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        return CryptoJS2.HmacSHA1;
      });
    }
  });

  // node_modules/crypto-js/hmac-sha256.js
  var require_hmac_sha256 = __commonJS({
    "node_modules/crypto-js/hmac-sha256.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha256(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha256", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        return CryptoJS2.HmacSHA256;
      });
    }
  });

  // node_modules/crypto-js/hmac-sha224.js
  var require_hmac_sha224 = __commonJS({
    "node_modules/crypto-js/hmac-sha224.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_sha256(), require_sha224(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./sha256", "./sha224", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        return CryptoJS2.HmacSHA224;
      });
    }
  });

  // node_modules/crypto-js/hmac-sha512.js
  var require_hmac_sha512 = __commonJS({
    "node_modules/crypto-js/hmac-sha512.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core(), require_sha512(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core", "./sha512", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        return CryptoJS2.HmacSHA512;
      });
    }
  });

  // node_modules/crypto-js/hmac-sha384.js
  var require_hmac_sha384 = __commonJS({
    "node_modules/crypto-js/hmac-sha384.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_x64_core(), require_sha512(), require_sha384(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./x64-core", "./sha512", "./sha384", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        return CryptoJS2.HmacSHA384;
      });
    }
  });

  // node_modules/crypto-js/hmac-ripemd160.js
  var require_hmac_ripemd160 = __commonJS({
    "node_modules/crypto-js/hmac-ripemd160.js"(exports, module) {
      (function(root, factory, undef) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core(), require_ripemd160(), require_hmac());
        } else if (typeof define === "function" && define.amd) {
          define(["./core", "./ripemd160", "./hmac"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS2) {
        return CryptoJS2.HmacRIPEMD160;
      });
    }
  });

  // node_modules/unix-crypt-td-js/unix-crypt-td.min.js
  var require_unix_crypt_td_min = __commonJS({
    "node_modules/unix-crypt-td-js/unix-crypt-td.min.js"(exports, module) {
      var z = function() {
        function x(e) {
          var a, t = [];
          for (a = 0; a < e.length; ++a) t[a] = e.charCodeAt(a);
          return t;
        }
        for (var A = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7], B = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25], C = [
          57,
          49,
          41,
          33,
          25,
          17,
          9,
          1,
          58,
          50,
          42,
          34,
          26,
          18,
          10,
          2,
          59,
          51,
          43,
          35,
          27,
          19,
          11,
          3,
          60,
          52,
          44,
          36
        ], D = [63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], E = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1], F = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2], G = [41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], m = [], n = [], u = [], w = 0; 16 > w; ++w) u[w] = [];
        var p = [], H = [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1], I = [[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13], [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9], [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12], [
          7,
          13,
          14,
          3,
          0,
          6,
          9,
          10,
          1,
          2,
          8,
          5,
          11,
          12,
          4,
          15,
          13,
          8,
          11,
          5,
          6,
          15,
          0,
          3,
          4,
          7,
          2,
          12,
          1,
          10,
          14,
          9,
          10,
          6,
          9,
          0,
          12,
          11,
          7,
          13,
          15,
          1,
          3,
          14,
          5,
          2,
          8,
          4,
          3,
          15,
          0,
          6,
          10,
          1,
          13,
          8,
          9,
          4,
          5,
          11,
          12,
          7,
          2,
          14
        ], [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3], [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13], [
          4,
          11,
          2,
          14,
          15,
          0,
          8,
          13,
          3,
          12,
          9,
          7,
          5,
          10,
          6,
          1,
          13,
          0,
          11,
          7,
          4,
          9,
          1,
          10,
          14,
          3,
          5,
          12,
          2,
          15,
          8,
          6,
          1,
          4,
          11,
          13,
          12,
          3,
          7,
          14,
          10,
          15,
          6,
          8,
          0,
          5,
          9,
          2,
          6,
          11,
          13,
          8,
          1,
          4,
          10,
          7,
          9,
          5,
          0,
          15,
          14,
          2,
          3,
          12
        ], [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]], J = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25], q = [], g = [], y = [[]], r = [], h = [];
        return function(e, a, t) {
          "string" === typeof e && (e = x(e));
          "string" === typeof a && (a = x(a));
          var b, c, f, d, k = [], l = [];
          for (b = 0; 66 > b; b++) k[b] = 0;
          for (f = b = 0; (d = e[f]) && 64 > b; ++f) {
            for (c = 0; 7 > c; c++, b++) k[b] = d >> 6 - c & 1;
            b++;
          }
          for (b = 0; 28 > b; b++) m[b] = k[C[b] - 1], n[b] = k[D[b] - 1];
          for (b = 0; 16 > b; b++) {
            for (f = 0; f < E[b]; f++) {
              d = m[0];
              for (c = 0; 27 > c; c++) m[c] = m[c + 1];
              m[27] = d;
              d = n[0];
              for (c = 0; 27 > c; c++) n[c] = n[c + 1];
              n[27] = d;
            }
            for (c = 0; 24 > c; c++) u[b][c] = m[F[c] - 1], u[b][c + 24] = n[G[c] - 28 - 1];
          }
          for (b = 0; 66 > b; b++) k[b] = 0;
          for (b = 0; 48 > b; b++) p[b] = H[b];
          for (f = b = 0; 2 > b; b++, ++f) for (d = a[f], l[b] = d, 90 < d && (d -= 6), 57 < d && (d -= 7), d -= 46, c = 0; 6 > c; c++) d >> c & 1 && (e = p[6 * b + c], p[6 * b + c] = p[6 * b + c + 24], p[6 * b + c + 24] = e);
          for (b = 0; 25 > b; b++) {
            f = k;
            d = [];
            for (a = 0; 64 > a; a++) d[a] = f[A[a] - 1];
            for (a = 0; 32 > a; ++a) q[a] = d[a], g[a] = d[a + 32];
            for (c = 0; 16 > c; c++) {
              e = c;
              for (a = 0; 32 > a; a++) y[a] = g[a];
              for (a = 0; 48 > a; a++) h[a] = g[p[a] - 1] ^ u[e][a];
              for (a = 0; 8 > a; a++) {
                e = 6 * a;
                var v = I[a][(h[e] << 5) + (h[e + 1] << 3) + (h[e + 2] << 2) + (h[e + 3] << 1) + (h[e + 4] << 0) + (h[e + 5] << 4)];
                e = 4 * a;
                r[e] = v >> 3 & 1;
                r[e + 1] = v >> 2 & 1;
                r[e + 2] = v >> 1 & 1;
                r[e + 3] = v >> 0 & 1;
              }
              for (a = 0; 32 > a; a++) g[a] = q[a] ^ r[J[a] - 1];
              for (a = 0; 32 > a; a++) q[a] = y[a];
            }
            for (a = 0; 32 > a; a++) e = q[a], q[a] = g[a], g[a] = e;
            for (a = 0; 32 > a; ++a) d[a] = q[a], d[a + 32] = g[a];
            for (a = 0; 64 > a; a++) f[a] = d[B[a] - 1];
          }
          for (b = 0; 11 > b; b++) {
            for (c = d = 0; 6 > c; c++) d <<= 1, d |= k[6 * b + c];
            d += 46;
            57 < d && (d += 7);
            90 < d && (d += 6);
            l[b + 2] = d;
          }
          0 == l[1] && (l[1] = l[0]);
          return t ? l : String.fromCharCode.apply(String, l);
        };
      }();
      "undefined" !== typeof module && null != module && (module.exports = z);
      "undefined" !== typeof window && null != window && (window.unixCryptTD = z);
    }
  });

  // hash/src/birc-hash.js
  var import_core = __toESM(require_core());
  var import_md5 = __toESM(require_md5());
  var import_sha1 = __toESM(require_sha1());
  var import_sha256 = __toESM(require_sha256());
  var import_sha224 = __toESM(require_sha224());
  var import_x64_core = __toESM(require_x64_core());
  var import_sha512 = __toESM(require_sha512());
  var import_sha384 = __toESM(require_sha384());
  var import_ripemd160 = __toESM(require_ripemd160());
  var import_hmac = __toESM(require_hmac());
  var import_hmac_md5 = __toESM(require_hmac_md5());
  var import_hmac_sha1 = __toESM(require_hmac_sha1());
  var import_hmac_sha256 = __toESM(require_hmac_sha256());
  var import_hmac_sha224 = __toESM(require_hmac_sha224());
  var import_hmac_sha512 = __toESM(require_hmac_sha512());
  var import_hmac_sha384 = __toESM(require_hmac_sha384());
  var import_hmac_ripemd160 = __toESM(require_hmac_ripemd160());

  // node_modules/bcryptjs/index.js
  var import_crypto = __toESM(require_crypto(), 1);
  var randomFallback = null;
  function randomBytes(len) {
    try {
      return crypto.getRandomValues(new Uint8Array(len));
    } catch {
    }
    try {
      return import_crypto.default.randomBytes(len);
    } catch {
    }
    if (!randomFallback) {
      throw Error(
        "Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative"
      );
    }
    return randomFallback(len);
  }
  function setRandomFallback(random) {
    randomFallback = random;
  }
  function genSaltSync(rounds, seed_length) {
    rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
    if (typeof rounds !== "number")
      throw Error(
        "Illegal arguments: " + typeof rounds + ", " + typeof seed_length
      );
    if (rounds < 4) rounds = 4;
    else if (rounds > 31) rounds = 31;
    var salt = [];
    salt.push("$2b$");
    if (rounds < 10) salt.push("0");
    salt.push(rounds.toString());
    salt.push("$");
    salt.push(base64_encode(randomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));
    return salt.join("");
  }
  function genSalt(rounds, seed_length, callback) {
    if (typeof seed_length === "function")
      callback = seed_length, seed_length = void 0;
    if (typeof rounds === "function") callback = rounds, rounds = void 0;
    if (typeof rounds === "undefined") rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
    else if (typeof rounds !== "number")
      throw Error("illegal arguments: " + typeof rounds);
    function _async(callback2) {
      nextTick(function() {
        try {
          callback2(null, genSaltSync(rounds));
        } catch (err) {
          callback2(err);
        }
      });
    }
    if (callback) {
      if (typeof callback !== "function")
        throw Error("Illegal callback: " + typeof callback);
      _async(callback);
    } else
      return new Promise(function(resolve, reject) {
        _async(function(err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        });
      });
  }
  function hashSync(password, salt) {
    if (typeof salt === "undefined") salt = GENSALT_DEFAULT_LOG2_ROUNDS;
    if (typeof salt === "number") salt = genSaltSync(salt);
    if (typeof password !== "string" || typeof salt !== "string")
      throw Error("Illegal arguments: " + typeof password + ", " + typeof salt);
    return _hash(password, salt);
  }
  function hash(password, salt, callback, progressCallback) {
    function _async(callback2) {
      if (typeof password === "string" && typeof salt === "number")
        genSalt(salt, function(err, salt2) {
          _hash(password, salt2, callback2, progressCallback);
        });
      else if (typeof password === "string" && typeof salt === "string")
        _hash(password, salt, callback2, progressCallback);
      else
        nextTick(
          callback2.bind(
            this,
            Error("Illegal arguments: " + typeof password + ", " + typeof salt)
          )
        );
    }
    if (callback) {
      if (typeof callback !== "function")
        throw Error("Illegal callback: " + typeof callback);
      _async(callback);
    } else
      return new Promise(function(resolve, reject) {
        _async(function(err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        });
      });
  }
  function safeStringCompare(known, unknown) {
    var diff = known.length ^ unknown.length;
    for (var i = 0; i < known.length; ++i) {
      diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
    }
    return diff === 0;
  }
  function compareSync(password, hash2) {
    if (typeof password !== "string" || typeof hash2 !== "string")
      throw Error("Illegal arguments: " + typeof password + ", " + typeof hash2);
    if (hash2.length !== 60) return false;
    return safeStringCompare(
      hashSync(password, hash2.substring(0, hash2.length - 31)),
      hash2
    );
  }
  function compare(password, hashValue, callback, progressCallback) {
    function _async(callback2) {
      if (typeof password !== "string" || typeof hashValue !== "string") {
        nextTick(
          callback2.bind(
            this,
            Error(
              "Illegal arguments: " + typeof password + ", " + typeof hashValue
            )
          )
        );
        return;
      }
      if (hashValue.length !== 60) {
        nextTick(callback2.bind(this, null, false));
        return;
      }
      hash(
        password,
        hashValue.substring(0, 29),
        function(err, comp) {
          if (err) callback2(err);
          else callback2(null, safeStringCompare(comp, hashValue));
        },
        progressCallback
      );
    }
    if (callback) {
      if (typeof callback !== "function")
        throw Error("Illegal callback: " + typeof callback);
      _async(callback);
    } else
      return new Promise(function(resolve, reject) {
        _async(function(err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        });
      });
  }
  function getRounds(hash2) {
    if (typeof hash2 !== "string")
      throw Error("Illegal arguments: " + typeof hash2);
    return parseInt(hash2.split("$")[2], 10);
  }
  function getSalt(hash2) {
    if (typeof hash2 !== "string")
      throw Error("Illegal arguments: " + typeof hash2);
    if (hash2.length !== 60)
      throw Error("Illegal hash length: " + hash2.length + " != 60");
    return hash2.substring(0, 29);
  }
  function truncates(password) {
    if (typeof password !== "string")
      throw Error("Illegal arguments: " + typeof password);
    return utf8Length(password) > 72;
  }
  var nextTick = typeof setImmediate === "function" ? setImmediate : typeof scheduler === "object" && typeof scheduler.postTask === "function" ? scheduler.postTask.bind(scheduler) : setTimeout;
  function utf8Length(string) {
    var len = 0, c = 0;
    for (var i = 0; i < string.length; ++i) {
      c = string.charCodeAt(i);
      if (c < 128) len += 1;
      else if (c < 2048) len += 2;
      else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
        ++i;
        len += 4;
      } else len += 3;
    }
    return len;
  }
  function utf8Array(string) {
    var offset = 0, c1, c2;
    var buffer = new Array(utf8Length(string));
    for (var i = 0, k = string.length; i < k; ++i) {
      c1 = string.charCodeAt(i);
      if (c1 < 128) {
        buffer[offset++] = c1;
      } else if (c1 < 2048) {
        buffer[offset++] = c1 >> 6 | 192;
        buffer[offset++] = c1 & 63 | 128;
      } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
        c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
        ++i;
        buffer[offset++] = c1 >> 18 | 240;
        buffer[offset++] = c1 >> 12 & 63 | 128;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      } else {
        buffer[offset++] = c1 >> 12 | 224;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      }
    }
    return buffer;
  }
  var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
  var BASE64_INDEX = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    -1,
    -1,
    -1,
    -1,
    -1
  ];
  function base64_encode(b, len) {
    var off = 0, rs = [], c1, c2;
    if (len <= 0 || len > b.length) throw Error("Illegal len: " + len);
    while (off < len) {
      c1 = b[off++] & 255;
      rs.push(BASE64_CODE[c1 >> 2 & 63]);
      c1 = (c1 & 3) << 4;
      if (off >= len) {
        rs.push(BASE64_CODE[c1 & 63]);
        break;
      }
      c2 = b[off++] & 255;
      c1 |= c2 >> 4 & 15;
      rs.push(BASE64_CODE[c1 & 63]);
      c1 = (c2 & 15) << 2;
      if (off >= len) {
        rs.push(BASE64_CODE[c1 & 63]);
        break;
      }
      c2 = b[off++] & 255;
      c1 |= c2 >> 6 & 3;
      rs.push(BASE64_CODE[c1 & 63]);
      rs.push(BASE64_CODE[c2 & 63]);
    }
    return rs.join("");
  }
  function base64_decode(s, len) {
    var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
    if (len <= 0) throw Error("Illegal len: " + len);
    while (off < slen - 1 && olen < len) {
      code = s.charCodeAt(off++);
      c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
      code = s.charCodeAt(off++);
      c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
      if (c1 == -1 || c2 == -1) break;
      o = c1 << 2 >>> 0;
      o |= (c2 & 48) >> 4;
      rs.push(String.fromCharCode(o));
      if (++olen >= len || off >= slen) break;
      code = s.charCodeAt(off++);
      c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
      if (c3 == -1) break;
      o = (c2 & 15) << 4 >>> 0;
      o |= (c3 & 60) >> 2;
      rs.push(String.fromCharCode(o));
      if (++olen >= len || off >= slen) break;
      code = s.charCodeAt(off++);
      c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
      o = (c3 & 3) << 6 >>> 0;
      o |= c4;
      rs.push(String.fromCharCode(o));
      ++olen;
    }
    var res = [];
    for (off = 0; off < olen; off++) res.push(rs[off].charCodeAt(0));
    return res;
  }
  var BCRYPT_SALT_LEN = 16;
  var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
  var BLOWFISH_NUM_ROUNDS = 16;
  var MAX_EXECUTION_TIME = 100;
  var P_ORIG = [
    608135816,
    2242054355,
    320440878,
    57701188,
    2752067618,
    698298832,
    137296536,
    3964562569,
    1160258022,
    953160567,
    3193202383,
    887688300,
    3232508343,
    3380367581,
    1065670069,
    3041331479,
    2450970073,
    2306472731
  ];
  var S_ORIG = [
    3509652390,
    2564797868,
    805139163,
    3491422135,
    3101798381,
    1780907670,
    3128725573,
    4046225305,
    614570311,
    3012652279,
    134345442,
    2240740374,
    1667834072,
    1901547113,
    2757295779,
    4103290238,
    227898511,
    1921955416,
    1904987480,
    2182433518,
    2069144605,
    3260701109,
    2620446009,
    720527379,
    3318853667,
    677414384,
    3393288472,
    3101374703,
    2390351024,
    1614419982,
    1822297739,
    2954791486,
    3608508353,
    3174124327,
    2024746970,
    1432378464,
    3864339955,
    2857741204,
    1464375394,
    1676153920,
    1439316330,
    715854006,
    3033291828,
    289532110,
    2706671279,
    2087905683,
    3018724369,
    1668267050,
    732546397,
    1947742710,
    3462151702,
    2609353502,
    2950085171,
    1814351708,
    2050118529,
    680887927,
    999245976,
    1800124847,
    3300911131,
    1713906067,
    1641548236,
    4213287313,
    1216130144,
    1575780402,
    4018429277,
    3917837745,
    3693486850,
    3949271944,
    596196993,
    3549867205,
    258830323,
    2213823033,
    772490370,
    2760122372,
    1774776394,
    2652871518,
    566650946,
    4142492826,
    1728879713,
    2882767088,
    1783734482,
    3629395816,
    2517608232,
    2874225571,
    1861159788,
    326777828,
    3124490320,
    2130389656,
    2716951837,
    967770486,
    1724537150,
    2185432712,
    2364442137,
    1164943284,
    2105845187,
    998989502,
    3765401048,
    2244026483,
    1075463327,
    1455516326,
    1322494562,
    910128902,
    469688178,
    1117454909,
    936433444,
    3490320968,
    3675253459,
    1240580251,
    122909385,
    2157517691,
    634681816,
    4142456567,
    3825094682,
    3061402683,
    2540495037,
    79693498,
    3249098678,
    1084186820,
    1583128258,
    426386531,
    1761308591,
    1047286709,
    322548459,
    995290223,
    1845252383,
    2603652396,
    3431023940,
    2942221577,
    3202600964,
    3727903485,
    1712269319,
    422464435,
    3234572375,
    1170764815,
    3523960633,
    3117677531,
    1434042557,
    442511882,
    3600875718,
    1076654713,
    1738483198,
    4213154764,
    2393238008,
    3677496056,
    1014306527,
    4251020053,
    793779912,
    2902807211,
    842905082,
    4246964064,
    1395751752,
    1040244610,
    2656851899,
    3396308128,
    445077038,
    3742853595,
    3577915638,
    679411651,
    2892444358,
    2354009459,
    1767581616,
    3150600392,
    3791627101,
    3102740896,
    284835224,
    4246832056,
    1258075500,
    768725851,
    2589189241,
    3069724005,
    3532540348,
    1274779536,
    3789419226,
    2764799539,
    1660621633,
    3471099624,
    4011903706,
    913787905,
    3497959166,
    737222580,
    2514213453,
    2928710040,
    3937242737,
    1804850592,
    3499020752,
    2949064160,
    2386320175,
    2390070455,
    2415321851,
    4061277028,
    2290661394,
    2416832540,
    1336762016,
    1754252060,
    3520065937,
    3014181293,
    791618072,
    3188594551,
    3933548030,
    2332172193,
    3852520463,
    3043980520,
    413987798,
    3465142937,
    3030929376,
    4245938359,
    2093235073,
    3534596313,
    375366246,
    2157278981,
    2479649556,
    555357303,
    3870105701,
    2008414854,
    3344188149,
    4221384143,
    3956125452,
    2067696032,
    3594591187,
    2921233993,
    2428461,
    544322398,
    577241275,
    1471733935,
    610547355,
    4027169054,
    1432588573,
    1507829418,
    2025931657,
    3646575487,
    545086370,
    48609733,
    2200306550,
    1653985193,
    298326376,
    1316178497,
    3007786442,
    2064951626,
    458293330,
    2589141269,
    3591329599,
    3164325604,
    727753846,
    2179363840,
    146436021,
    1461446943,
    4069977195,
    705550613,
    3059967265,
    3887724982,
    4281599278,
    3313849956,
    1404054877,
    2845806497,
    146425753,
    1854211946,
    1266315497,
    3048417604,
    3681880366,
    3289982499,
    290971e4,
    1235738493,
    2632868024,
    2414719590,
    3970600049,
    1771706367,
    1449415276,
    3266420449,
    422970021,
    1963543593,
    2690192192,
    3826793022,
    1062508698,
    1531092325,
    1804592342,
    2583117782,
    2714934279,
    4024971509,
    1294809318,
    4028980673,
    1289560198,
    2221992742,
    1669523910,
    35572830,
    157838143,
    1052438473,
    1016535060,
    1802137761,
    1753167236,
    1386275462,
    3080475397,
    2857371447,
    1040679964,
    2145300060,
    2390574316,
    1461121720,
    2956646967,
    4031777805,
    4028374788,
    33600511,
    2920084762,
    1018524850,
    629373528,
    3691585981,
    3515945977,
    2091462646,
    2486323059,
    586499841,
    988145025,
    935516892,
    3367335476,
    2599673255,
    2839830854,
    265290510,
    3972581182,
    2759138881,
    3795373465,
    1005194799,
    847297441,
    406762289,
    1314163512,
    1332590856,
    1866599683,
    4127851711,
    750260880,
    613907577,
    1450815602,
    3165620655,
    3734664991,
    3650291728,
    3012275730,
    3704569646,
    1427272223,
    778793252,
    1343938022,
    2676280711,
    2052605720,
    1946737175,
    3164576444,
    3914038668,
    3967478842,
    3682934266,
    1661551462,
    3294938066,
    4011595847,
    840292616,
    3712170807,
    616741398,
    312560963,
    711312465,
    1351876610,
    322626781,
    1910503582,
    271666773,
    2175563734,
    1594956187,
    70604529,
    3617834859,
    1007753275,
    1495573769,
    4069517037,
    2549218298,
    2663038764,
    504708206,
    2263041392,
    3941167025,
    2249088522,
    1514023603,
    1998579484,
    1312622330,
    694541497,
    2582060303,
    2151582166,
    1382467621,
    776784248,
    2618340202,
    3323268794,
    2497899128,
    2784771155,
    503983604,
    4076293799,
    907881277,
    423175695,
    432175456,
    1378068232,
    4145222326,
    3954048622,
    3938656102,
    3820766613,
    2793130115,
    2977904593,
    26017576,
    3274890735,
    3194772133,
    1700274565,
    1756076034,
    4006520079,
    3677328699,
    720338349,
    1533947780,
    354530856,
    688349552,
    3973924725,
    1637815568,
    332179504,
    3949051286,
    53804574,
    2852348879,
    3044236432,
    1282449977,
    3583942155,
    3416972820,
    4006381244,
    1617046695,
    2628476075,
    3002303598,
    1686838959,
    431878346,
    2686675385,
    1700445008,
    1080580658,
    1009431731,
    832498133,
    3223435511,
    2605976345,
    2271191193,
    2516031870,
    1648197032,
    4164389018,
    2548247927,
    300782431,
    375919233,
    238389289,
    3353747414,
    2531188641,
    2019080857,
    1475708069,
    455242339,
    2609103871,
    448939670,
    3451063019,
    1395535956,
    2413381860,
    1841049896,
    1491858159,
    885456874,
    4264095073,
    4001119347,
    1565136089,
    3898914787,
    1108368660,
    540939232,
    1173283510,
    2745871338,
    3681308437,
    4207628240,
    3343053890,
    4016749493,
    1699691293,
    1103962373,
    3625875870,
    2256883143,
    3830138730,
    1031889488,
    3479347698,
    1535977030,
    4236805024,
    3251091107,
    2132092099,
    1774941330,
    1199868427,
    1452454533,
    157007616,
    2904115357,
    342012276,
    595725824,
    1480756522,
    206960106,
    497939518,
    591360097,
    863170706,
    2375253569,
    3596610801,
    1814182875,
    2094937945,
    3421402208,
    1082520231,
    3463918190,
    2785509508,
    435703966,
    3908032597,
    1641649973,
    2842273706,
    3305899714,
    1510255612,
    2148256476,
    2655287854,
    3276092548,
    4258621189,
    236887753,
    3681803219,
    274041037,
    1734335097,
    3815195456,
    3317970021,
    1899903192,
    1026095262,
    4050517792,
    356393447,
    2410691914,
    3873677099,
    3682840055,
    3913112168,
    2491498743,
    4132185628,
    2489919796,
    1091903735,
    1979897079,
    3170134830,
    3567386728,
    3557303409,
    857797738,
    1136121015,
    1342202287,
    507115054,
    2535736646,
    337727348,
    3213592640,
    1301675037,
    2528481711,
    1895095763,
    1721773893,
    3216771564,
    62756741,
    2142006736,
    835421444,
    2531993523,
    1442658625,
    3659876326,
    2882144922,
    676362277,
    1392781812,
    170690266,
    3921047035,
    1759253602,
    3611846912,
    1745797284,
    664899054,
    1329594018,
    3901205900,
    3045908486,
    2062866102,
    2865634940,
    3543621612,
    3464012697,
    1080764994,
    553557557,
    3656615353,
    3996768171,
    991055499,
    499776247,
    1265440854,
    648242737,
    3940784050,
    980351604,
    3713745714,
    1749149687,
    3396870395,
    4211799374,
    3640570775,
    1161844396,
    3125318951,
    1431517754,
    545492359,
    4268468663,
    3499529547,
    1437099964,
    2702547544,
    3433638243,
    2581715763,
    2787789398,
    1060185593,
    1593081372,
    2418618748,
    4260947970,
    69676912,
    2159744348,
    86519011,
    2512459080,
    3838209314,
    1220612927,
    3339683548,
    133810670,
    1090789135,
    1078426020,
    1569222167,
    845107691,
    3583754449,
    4072456591,
    1091646820,
    628848692,
    1613405280,
    3757631651,
    526609435,
    236106946,
    48312990,
    2942717905,
    3402727701,
    1797494240,
    859738849,
    992217954,
    4005476642,
    2243076622,
    3870952857,
    3732016268,
    765654824,
    3490871365,
    2511836413,
    1685915746,
    3888969200,
    1414112111,
    2273134842,
    3281911079,
    4080962846,
    172450625,
    2569994100,
    980381355,
    4109958455,
    2819808352,
    2716589560,
    2568741196,
    3681446669,
    3329971472,
    1835478071,
    660984891,
    3704678404,
    4045999559,
    3422617507,
    3040415634,
    1762651403,
    1719377915,
    3470491036,
    2693910283,
    3642056355,
    3138596744,
    1364962596,
    2073328063,
    1983633131,
    926494387,
    3423689081,
    2150032023,
    4096667949,
    1749200295,
    3328846651,
    309677260,
    2016342300,
    1779581495,
    3079819751,
    111262694,
    1274766160,
    443224088,
    298511866,
    1025883608,
    3806446537,
    1145181785,
    168956806,
    3641502830,
    3584813610,
    1689216846,
    3666258015,
    3200248200,
    1692713982,
    2646376535,
    4042768518,
    1618508792,
    1610833997,
    3523052358,
    4130873264,
    2001055236,
    3610705100,
    2202168115,
    4028541809,
    2961195399,
    1006657119,
    2006996926,
    3186142756,
    1430667929,
    3210227297,
    1314452623,
    4074634658,
    4101304120,
    2273951170,
    1399257539,
    3367210612,
    3027628629,
    1190975929,
    2062231137,
    2333990788,
    2221543033,
    2438960610,
    1181637006,
    548689776,
    2362791313,
    3372408396,
    3104550113,
    3145860560,
    296247880,
    1970579870,
    3078560182,
    3769228297,
    1714227617,
    3291629107,
    3898220290,
    166772364,
    1251581989,
    493813264,
    448347421,
    195405023,
    2709975567,
    677966185,
    3703036547,
    1463355134,
    2715995803,
    1338867538,
    1343315457,
    2802222074,
    2684532164,
    233230375,
    2599980071,
    2000651841,
    3277868038,
    1638401717,
    4028070440,
    3237316320,
    6314154,
    819756386,
    300326615,
    590932579,
    1405279636,
    3267499572,
    3150704214,
    2428286686,
    3959192993,
    3461946742,
    1862657033,
    1266418056,
    963775037,
    2089974820,
    2263052895,
    1917689273,
    448879540,
    3550394620,
    3981727096,
    150775221,
    3627908307,
    1303187396,
    508620638,
    2975983352,
    2726630617,
    1817252668,
    1876281319,
    1457606340,
    908771278,
    3720792119,
    3617206836,
    2455994898,
    1729034894,
    1080033504,
    976866871,
    3556439503,
    2881648439,
    1522871579,
    1555064734,
    1336096578,
    3548522304,
    2579274686,
    3574697629,
    3205460757,
    3593280638,
    3338716283,
    3079412587,
    564236357,
    2993598910,
    1781952180,
    1464380207,
    3163844217,
    3332601554,
    1699332808,
    1393555694,
    1183702653,
    3581086237,
    1288719814,
    691649499,
    2847557200,
    2895455976,
    3193889540,
    2717570544,
    1781354906,
    1676643554,
    2592534050,
    3230253752,
    1126444790,
    2770207658,
    2633158820,
    2210423226,
    2615765581,
    2414155088,
    3127139286,
    673620729,
    2805611233,
    1269405062,
    4015350505,
    3341807571,
    4149409754,
    1057255273,
    2012875353,
    2162469141,
    2276492801,
    2601117357,
    993977747,
    3918593370,
    2654263191,
    753973209,
    36408145,
    2530585658,
    25011837,
    3520020182,
    2088578344,
    530523599,
    2918365339,
    1524020338,
    1518925132,
    3760827505,
    3759777254,
    1202760957,
    3985898139,
    3906192525,
    674977740,
    4174734889,
    2031300136,
    2019492241,
    3983892565,
    4153806404,
    3822280332,
    352677332,
    2297720250,
    60907813,
    90501309,
    3286998549,
    1016092578,
    2535922412,
    2839152426,
    457141659,
    509813237,
    4120667899,
    652014361,
    1966332200,
    2975202805,
    55981186,
    2327461051,
    676427537,
    3255491064,
    2882294119,
    3433927263,
    1307055953,
    942726286,
    933058658,
    2468411793,
    3933900994,
    4215176142,
    1361170020,
    2001714738,
    2830558078,
    3274259782,
    1222529897,
    1679025792,
    2729314320,
    3714953764,
    1770335741,
    151462246,
    3013232138,
    1682292957,
    1483529935,
    471910574,
    1539241949,
    458788160,
    3436315007,
    1807016891,
    3718408830,
    978976581,
    1043663428,
    3165965781,
    1927990952,
    4200891579,
    2372276910,
    3208408903,
    3533431907,
    1412390302,
    2931980059,
    4132332400,
    1947078029,
    3881505623,
    4168226417,
    2941484381,
    1077988104,
    1320477388,
    886195818,
    18198404,
    3786409e3,
    2509781533,
    112762804,
    3463356488,
    1866414978,
    891333506,
    18488651,
    661792760,
    1628790961,
    3885187036,
    3141171499,
    876946877,
    2693282273,
    1372485963,
    791857591,
    2686433993,
    3759982718,
    3167212022,
    3472953795,
    2716379847,
    445679433,
    3561995674,
    3504004811,
    3574258232,
    54117162,
    3331405415,
    2381918588,
    3769707343,
    4154350007,
    1140177722,
    4074052095,
    668550556,
    3214352940,
    367459370,
    261225585,
    2610173221,
    4209349473,
    3468074219,
    3265815641,
    314222801,
    3066103646,
    3808782860,
    282218597,
    3406013506,
    3773591054,
    379116347,
    1285071038,
    846784868,
    2669647154,
    3771962079,
    3550491691,
    2305946142,
    453669953,
    1268987020,
    3317592352,
    3279303384,
    3744833421,
    2610507566,
    3859509063,
    266596637,
    3847019092,
    517658769,
    3462560207,
    3443424879,
    370717030,
    4247526661,
    2224018117,
    4143653529,
    4112773975,
    2788324899,
    2477274417,
    1456262402,
    2901442914,
    1517677493,
    1846949527,
    2295493580,
    3734397586,
    2176403920,
    1280348187,
    1908823572,
    3871786941,
    846861322,
    1172426758,
    3287448474,
    3383383037,
    1655181056,
    3139813346,
    901632758,
    1897031941,
    2986607138,
    3066810236,
    3447102507,
    1393639104,
    373351379,
    950779232,
    625454576,
    3124240540,
    4148612726,
    2007998917,
    544563296,
    2244738638,
    2330496472,
    2058025392,
    1291430526,
    424198748,
    50039436,
    29584100,
    3605783033,
    2429876329,
    2791104160,
    1057563949,
    3255363231,
    3075367218,
    3463963227,
    1469046755,
    985887462
  ];
  var C_ORIG = [
    1332899944,
    1700884034,
    1701343084,
    1684370003,
    1668446532,
    1869963892
  ];
  function _encipher(lr, off, P, S) {
    var n, l = lr[off], r = lr[off + 1];
    l ^= P[0];
    n = S[l >>> 24];
    n += S[256 | l >> 16 & 255];
    n ^= S[512 | l >> 8 & 255];
    n += S[768 | l & 255];
    r ^= n ^ P[1];
    n = S[r >>> 24];
    n += S[256 | r >> 16 & 255];
    n ^= S[512 | r >> 8 & 255];
    n += S[768 | r & 255];
    l ^= n ^ P[2];
    n = S[l >>> 24];
    n += S[256 | l >> 16 & 255];
    n ^= S[512 | l >> 8 & 255];
    n += S[768 | l & 255];
    r ^= n ^ P[3];
    n = S[r >>> 24];
    n += S[256 | r >> 16 & 255];
    n ^= S[512 | r >> 8 & 255];
    n += S[768 | r & 255];
    l ^= n ^ P[4];
    n = S[l >>> 24];
    n += S[256 | l >> 16 & 255];
    n ^= S[512 | l >> 8 & 255];
    n += S[768 | l & 255];
    r ^= n ^ P[5];
    n = S[r >>> 24];
    n += S[256 | r >> 16 & 255];
    n ^= S[512 | r >> 8 & 255];
    n += S[768 | r & 255];
    l ^= n ^ P[6];
    n = S[l >>> 24];
    n += S[256 | l >> 16 & 255];
    n ^= S[512 | l >> 8 & 255];
    n += S[768 | l & 255];
    r ^= n ^ P[7];
    n = S[r >>> 24];
    n += S[256 | r >> 16 & 255];
    n ^= S[512 | r >> 8 & 255];
    n += S[768 | r & 255];
    l ^= n ^ P[8];
    n = S[l >>> 24];
    n += S[256 | l >> 16 & 255];
    n ^= S[512 | l >> 8 & 255];
    n += S[768 | l & 255];
    r ^= n ^ P[9];
    n = S[r >>> 24];
    n += S[256 | r >> 16 & 255];
    n ^= S[512 | r >> 8 & 255];
    n += S[768 | r & 255];
    l ^= n ^ P[10];
    n = S[l >>> 24];
    n += S[256 | l >> 16 & 255];
    n ^= S[512 | l >> 8 & 255];
    n += S[768 | l & 255];
    r ^= n ^ P[11];
    n = S[r >>> 24];
    n += S[256 | r >> 16 & 255];
    n ^= S[512 | r >> 8 & 255];
    n += S[768 | r & 255];
    l ^= n ^ P[12];
    n = S[l >>> 24];
    n += S[256 | l >> 16 & 255];
    n ^= S[512 | l >> 8 & 255];
    n += S[768 | l & 255];
    r ^= n ^ P[13];
    n = S[r >>> 24];
    n += S[256 | r >> 16 & 255];
    n ^= S[512 | r >> 8 & 255];
    n += S[768 | r & 255];
    l ^= n ^ P[14];
    n = S[l >>> 24];
    n += S[256 | l >> 16 & 255];
    n ^= S[512 | l >> 8 & 255];
    n += S[768 | l & 255];
    r ^= n ^ P[15];
    n = S[r >>> 24];
    n += S[256 | r >> 16 & 255];
    n ^= S[512 | r >> 8 & 255];
    n += S[768 | r & 255];
    l ^= n ^ P[16];
    lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
    lr[off + 1] = l;
    return lr;
  }
  function _streamtoword(data, offp) {
    for (var i = 0, word = 0; i < 4; ++i)
      word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
    return { key: word, offp };
  }
  function _key(key, P, S) {
    var offset = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
    for (var i = 0; i < plen; i++)
      sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
    for (i = 0; i < plen; i += 2)
      lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
    for (i = 0; i < slen; i += 2)
      lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
  }
  function _ekskey(data, key, P, S) {
    var offp = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
    for (var i = 0; i < plen; i++)
      sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
    offp = 0;
    for (i = 0; i < plen; i += 2)
      sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
    for (i = 0; i < slen; i += 2)
      sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
  }
  function _crypt(b, salt, rounds, callback, progressCallback) {
    var cdata = C_ORIG.slice(), clen = cdata.length, err;
    if (rounds < 4 || rounds > 31) {
      err = Error("Illegal number of rounds (4-31): " + rounds);
      if (callback) {
        nextTick(callback.bind(this, err));
        return;
      } else throw err;
    }
    if (salt.length !== BCRYPT_SALT_LEN) {
      err = Error(
        "Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN
      );
      if (callback) {
        nextTick(callback.bind(this, err));
        return;
      } else throw err;
    }
    rounds = 1 << rounds >>> 0;
    var P, S, i = 0, j;
    if (typeof Int32Array === "function") {
      P = new Int32Array(P_ORIG);
      S = new Int32Array(S_ORIG);
    } else {
      P = P_ORIG.slice();
      S = S_ORIG.slice();
    }
    _ekskey(salt, b, P, S);
    function next() {
      if (progressCallback) progressCallback(i / rounds);
      if (i < rounds) {
        var start = Date.now();
        for (; i < rounds; ) {
          i = i + 1;
          _key(b, P, S);
          _key(salt, P, S);
          if (Date.now() - start > MAX_EXECUTION_TIME) break;
        }
      } else {
        for (i = 0; i < 64; i++)
          for (j = 0; j < clen >> 1; j++) _encipher(cdata, j << 1, P, S);
        var ret = [];
        for (i = 0; i < clen; i++)
          ret.push((cdata[i] >> 24 & 255) >>> 0), ret.push((cdata[i] >> 16 & 255) >>> 0), ret.push((cdata[i] >> 8 & 255) >>> 0), ret.push((cdata[i] & 255) >>> 0);
        if (callback) {
          callback(null, ret);
          return;
        } else return ret;
      }
      if (callback) nextTick(next);
    }
    if (typeof callback !== "undefined") {
      next();
    } else {
      var res;
      while (true) if (typeof (res = next()) !== "undefined") return res || [];
    }
  }
  function _hash(password, salt, callback, progressCallback) {
    var err;
    if (typeof password !== "string" || typeof salt !== "string") {
      err = Error("Invalid string / salt: Not a string");
      if (callback) {
        nextTick(callback.bind(this, err));
        return;
      } else throw err;
    }
    var minor, offset;
    if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
      err = Error("Invalid salt version: " + salt.substring(0, 2));
      if (callback) {
        nextTick(callback.bind(this, err));
        return;
      } else throw err;
    }
    if (salt.charAt(2) === "$") minor = String.fromCharCode(0), offset = 3;
    else {
      minor = salt.charAt(2);
      if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
        err = Error("Invalid salt revision: " + salt.substring(2, 4));
        if (callback) {
          nextTick(callback.bind(this, err));
          return;
        } else throw err;
      }
      offset = 4;
    }
    if (salt.charAt(offset + 2) > "$") {
      err = Error("Missing salt rounds");
      if (callback) {
        nextTick(callback.bind(this, err));
        return;
      } else throw err;
    }
    var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
    password += minor >= "a" ? "\0" : "";
    var passwordb = utf8Array(password), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
    function finish(bytes) {
      var res = [];
      res.push("$2");
      if (minor >= "a") res.push(minor);
      res.push("$");
      if (rounds < 10) res.push("0");
      res.push(rounds.toString());
      res.push("$");
      res.push(base64_encode(saltb, saltb.length));
      res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
      return res.join("");
    }
    if (typeof callback == "undefined")
      return finish(_crypt(passwordb, saltb, rounds));
    else {
      _crypt(
        passwordb,
        saltb,
        rounds,
        function(err2, bytes) {
          if (err2) callback(err2, null);
          else callback(null, finish(bytes));
        },
        progressCallback
      );
    }
  }
  function encodeBase64(bytes, length) {
    return base64_encode(bytes, length);
  }
  function decodeBase64(string, length) {
    return base64_decode(string, length);
  }
  var bcryptjs_default = {
    setRandomFallback,
    genSaltSync,
    genSalt,
    hashSync,
    hash,
    compareSync,
    compare,
    getRounds,
    getSalt,
    truncates,
    encodeBase64,
    decodeBase64
  };

  // hash/src/birc-hash.js
  var import_unix_crypt_td_js = __toESM(require_unix_crypt_td_min());
  (function registerBircHashUtilitiesScript() {
    "use strict";
    var PHPASS_ALPHABET = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var MAXIMUM_INPUT_LENGTH = 4096;
    function printHashStatus(message) {
      birc.print("[Hash] " + message);
    }
    function splitFirstWord(input) {
      var firstWhitespaceIndex;
      var trimmedInput = input.trim();
      firstWhitespaceIndex = trimmedInput.search(/\s/);
      if (firstWhitespaceIndex === -1) {
        return { word: trimmedInput, remainder: "" };
      }
      return {
        word: trimmedInput.slice(0, firstWhitespaceIndex),
        remainder: trimmedInput.slice(firstWhitespaceIndex).trim()
      };
    }
    function splitAtPipe(input) {
      var pipeIndex = input.indexOf("|");
      if (pipeIndex === -1) {
        return null;
      }
      return {
        left: input.slice(0, pipeIndex).trim(),
        right: input.slice(pipeIndex + 1).trim()
      };
    }
    function cryptoJsDigest(algorithm, message) {
      switch (algorithm) {
        case "md5":
          return import_core.default.MD5(message).toString();
        case "sha1":
        case "sha-1":
          return import_core.default.SHA1(message).toString();
        case "sha256":
        case "sha-256":
          return import_core.default.SHA256(message).toString();
        case "sha224":
        case "sha-224":
          return import_core.default.SHA224(message).toString();
        case "sha512":
        case "sha-512":
          return import_core.default.SHA512(message).toString();
        case "sha384":
        case "sha-384":
          return import_core.default.SHA384(message).toString();
        case "ripemd160":
        case "ripemd-160":
          return import_core.default.RIPEMD160(message).toString();
        default:
          return "";
      }
    }
    function cryptoJsHmac(algorithm, key, message) {
      switch (algorithm) {
        case "md5":
          return import_core.default.HmacMD5(message, key).toString();
        case "sha1":
        case "sha-1":
          return import_core.default.HmacSHA1(message, key).toString();
        case "sha256":
        case "sha-256":
          return import_core.default.HmacSHA256(message, key).toString();
        case "sha224":
        case "sha-224":
          return import_core.default.HmacSHA224(message, key).toString();
        case "sha512":
        case "sha-512":
          return import_core.default.HmacSHA512(message, key).toString();
        case "sha384":
        case "sha-384":
          return import_core.default.HmacSHA384(message, key).toString();
        case "ripemd160":
        case "ripemd-160":
          return import_core.default.HmacRIPEMD160(message, key).toString();
        default:
          return "";
      }
    }
    function utf8Bytes(text) {
      var byteIndex;
      var bytes = [];
      var wordArray = import_core.default.enc.Utf8.parse(text);
      for (byteIndex = 0; byteIndex < wordArray.sigBytes; byteIndex += 1) {
        bytes.push(
          wordArray.words[byteIndex >>> 2] >>> 24 - byteIndex % 4 * 8 & 255
        );
      }
      return bytes;
    }
    function checksumTable(polynomial) {
      var bitIndex;
      var table = [];
      var tableIndex;
      var value;
      for (tableIndex = 0; tableIndex < 256; tableIndex += 1) {
        value = tableIndex;
        for (bitIndex = 0; bitIndex < 8; bitIndex += 1) {
          if ((value & 1) !== 0) {
            value = value >>> 1 ^ polynomial;
          } else {
            value >>>= 1;
          }
        }
        table.push(value >>> 0);
      }
      return table;
    }
    var CRC32_TABLE = checksumTable(3988292384);
    var CRC32C_TABLE = checksumTable(2197175160);
    function crcChecksum(bytes, table) {
      var byteIndex;
      var value = 4294967295;
      for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
        value = value >>> 8 ^ table[(value ^ bytes[byteIndex]) & 255];
      }
      return ((value ^ 4294967295) >>> 0).toString(16).padStart(8, "0");
    }
    function adler32Checksum(bytes) {
      var byteIndex;
      var firstSum = 1;
      var secondSum = 0;
      for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
        firstSum = (firstSum + bytes[byteIndex]) % 65521;
        secondSum = (secondSum + firstSum) % 65521;
      }
      return ((secondSum << 16 | firstSum) >>> 0).toString(16).padStart(8, "0");
    }
    function fnv1a32Checksum(bytes) {
      var byteIndex;
      var value = 2166136261;
      for (byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
        value ^= bytes[byteIndex];
        value = Math.imul(value, 16777619);
      }
      return (value >>> 0).toString(16).padStart(8, "0");
    }
    function calculateChecksum(algorithm, message) {
      var bytes = utf8Bytes(message);
      switch (algorithm) {
        case "crc32":
          return crcChecksum(bytes, CRC32_TABLE);
        case "crc32c":
          return crcChecksum(bytes, CRC32C_TABLE);
        case "adler32":
          return adler32Checksum(bytes);
        case "fnv1a32":
          return fnv1a32Checksum(bytes);
        default:
          return "";
      }
    }
    function encodePhpassBytes(inputBytes, outputCharacterCount) {
      var byteIndex = 0;
      var output = "";
      var value;
      while (byteIndex < inputBytes.length) {
        value = inputBytes[byteIndex];
        byteIndex += 1;
        output += PHPASS_ALPHABET.charAt(value & 63);
        if (byteIndex < inputBytes.length) {
          value |= inputBytes[byteIndex] << 8;
        }
        output += PHPASS_ALPHABET.charAt(value >> 6 & 63);
        if (byteIndex >= inputBytes.length) {
          break;
        }
        byteIndex += 1;
        if (byteIndex < inputBytes.length) {
          value |= inputBytes[byteIndex] << 16;
        }
        output += PHPASS_ALPHABET.charAt(value >> 12 & 63);
        if (byteIndex >= inputBytes.length) {
          break;
        }
        byteIndex += 1;
        output += PHPASS_ALPHABET.charAt(value >> 18 & 63);
      }
      return output.slice(0, outputCharacterCount);
    }
    function cryptoJsWordArrayToBytes(wordArray) {
      var byteIndex;
      var bytes = [];
      for (byteIndex = 0; byteIndex < wordArray.sigBytes; byteIndex += 1) {
        bytes.push(
          wordArray.words[byteIndex >>> 2] >>> 24 - byteIndex % 4 * 8 & 255
        );
      }
      return bytes;
    }
    function phpassHash(password, prefix, countLogarithm, salt) {
      var count = 1 << countLogarithm;
      var countCharacter = PHPASS_ALPHABET.charAt(countLogarithm);
      var hash2 = import_core.default.MD5(
        import_core.default.enc.Utf8.parse(salt).concat(
          import_core.default.enc.Utf8.parse(password)
        )
      );
      var iterationIndex;
      var passwordWords = import_core.default.enc.Utf8.parse(password);
      for (iterationIndex = 0; iterationIndex < count; iterationIndex += 1) {
        hash2 = import_core.default.MD5(hash2.clone().concat(passwordWords));
      }
      return prefix + countCharacter + salt + encodePhpassBytes(cryptoJsWordArrayToBytes(hash2), 22);
    }
    function constantTimeStringsEqual(first, second) {
      var characterIndex;
      var difference = first.length ^ second.length;
      var firstCharacterCode;
      var maximumLength = Math.max(first.length, second.length);
      var secondCharacterCode;
      for (characterIndex = 0; characterIndex < maximumLength; characterIndex += 1) {
        firstCharacterCode = first.charCodeAt(characterIndex);
        secondCharacterCode = second.charCodeAt(characterIndex);
        if (Number.isNaN(firstCharacterCode)) {
          firstCharacterCode = 0;
        }
        if (Number.isNaN(secondCharacterCode)) {
          secondCharacterCode = 0;
        }
        difference |= firstCharacterCode ^ secondCharacterCode;
      }
      return difference === 0;
    }
    function hashBcrypt(argumentsText) {
      var costPart = splitFirstWord(argumentsText);
      var cost = Number(costPart.word);
      var saltAndPassword = splitAtPipe(costPart.remainder);
      var setting;
      if (!Number.isInteger(cost)) {
        printHashStatus("bcrypt cost must be between 4 and 12.");
        return;
      }
      if (cost < 4) {
        printHashStatus("bcrypt cost must be between 4 and 12.");
        return;
      }
      if (cost > 12) {
        printHashStatus("bcrypt cost must be between 4 and 12.");
        return;
      }
      if (saltAndPassword === null) {
        printHashStatus("bcrypt requires: <cost> <22-character-salt> | <password>.");
        return;
      }
      if (!/^[./A-Za-z0-9]{22}$/.test(saltAndPassword.left)) {
        printHashStatus("bcrypt salt must contain 22 bcrypt-alphabet characters.");
        return;
      }
      if (bcryptjs_default.truncates(saltAndPassword.right)) {
        printHashStatus("bcrypt password exceeds its 72-byte limit.");
        return;
      }
      setting = "$2b$" + String(cost).padStart(2, "0") + "$" + saltAndPassword.left;
      try {
        printHashStatus(bcryptjs_default.hashSync(saltAndPassword.right, setting));
      } catch (error) {
        printHashStatus("bcrypt rejected the supplied setting.");
      }
    }
    function hashPhpass(argumentsText) {
      var countPart = splitFirstWord(argumentsText);
      var countLogarithm = Number(countPart.word);
      var saltAndPassword = splitAtPipe(countPart.remainder);
      if (!Number.isInteger(countLogarithm)) {
        printHashStatus("phpass count logarithm must be a whole number.");
        return;
      }
      if (countLogarithm < 7 || countLogarithm > 18) {
        printHashStatus("phpass count logarithm must be between 7 and 18.");
        return;
      }
      if (saltAndPassword === null) {
        printHashStatus("phpass requires: <count-log2> <8-character-salt> | <password>.");
        return;
      }
      if (!/^[./0-9A-Za-z]{8}$/.test(saltAndPassword.left)) {
        printHashStatus("phpass salt must contain 8 phpass-alphabet characters.");
        return;
      }
      printHashStatus(
        phpassHash(
          saltAndPassword.right,
          "$P$",
          countLogarithm,
          saltAndPassword.left
        )
      );
    }
    function verifyPassword(argumentsText) {
      var computedCryptHash;
      var computedHash;
      var countLogarithm;
      var hashAndPassword = splitAtPipe(argumentsText);
      var expectedHash;
      var prefix;
      if (hashAndPassword === null) {
        printHashStatus("verify requires: <encoded-hash> | <password>.");
        return;
      }
      expectedHash = hashAndPassword.left;
      if (expectedHash.indexOf("$2") === 0) {
        try {
          if (bcryptjs_default.compareSync(hashAndPassword.right, expectedHash)) {
            printHashStatus("MATCH");
          } else {
            printHashStatus("NO MATCH");
          }
        } catch (error) {
          printHashStatus("bcrypt hash is malformed.");
        }
        return;
      }
      prefix = expectedHash.slice(0, 3);
      if (prefix === "$P$" || prefix === "$H$") {
        if (expectedHash.length !== 34) {
          printHashStatus("phpass hash has an invalid length.");
          return;
        }
        countLogarithm = PHPASS_ALPHABET.indexOf(
          expectedHash.charAt(3)
        );
        if (countLogarithm < 7 || countLogarithm > 18) {
          printHashStatus("phpass hash has an unsupported count.");
          return;
        }
        computedHash = phpassHash(
          hashAndPassword.right,
          prefix,
          countLogarithm,
          expectedHash.slice(4, 12)
        );
        if (constantTimeStringsEqual(expectedHash, computedHash)) {
          printHashStatus("MATCH");
        } else {
          printHashStatus("NO MATCH");
        }
        return;
      }
      if (expectedHash.length === 13) {
        computedCryptHash = (0, import_unix_crypt_td_js.default)(
          hashAndPassword.right,
          expectedHash.slice(0, 2)
        );
        if (constantTimeStringsEqual(expectedHash, computedCryptHash)) {
          printHashStatus("MATCH");
        } else {
          printHashStatus("NO MATCH");
        }
        return;
      }
      printHashStatus("Unsupported password-hash format.");
    }
    function printHashHelp() {
      printHashStatus("/hash digest <md5|sha1|sha224|sha256|sha384|sha512|ripemd160> <text>");
      printHashStatus("/hash checksum <crc32|crc32c|adler32|fnv1a32> <text>");
      printHashStatus("/hash hmac <md5|sha1|sha224|sha256|sha384|sha512|ripemd160> <key> | <message>");
      printHashStatus("/hash password bcrypt <cost 4-12> <22-char-salt> | <password>");
      printHashStatus("/hash password phpass <count-log2 7-18> <8-char-salt> | <password>");
      printHashStatus("/hash password crypt <2-char-salt> | <password>");
      printHashStatus("/hash verify <encoded-password-hash> | <password>");
      printHashStatus("Salts are required because bIRC exposes no cryptographic random source.");
      printHashStatus("MD5, SHA-1, phpass, and DES crypt are legacy-only; never choose them for new security.");
    }
    function completeHashCommand(word) {
      var candidateIndex;
      var candidates = [
        "help",
        "digest",
        "checksum",
        "hmac",
        "password",
        "verify",
        "md5",
        "sha1",
        "sha224",
        "sha256",
        "sha384",
        "sha512",
        "ripemd160",
        "crc32",
        "crc32c",
        "adler32",
        "fnv1a32",
        "bcrypt",
        "phpass",
        "crypt"
      ];
      var completions = [];
      var lowerWord = word.toLowerCase();
      for (candidateIndex = 0; candidateIndex < candidates.length; candidateIndex += 1) {
        if (candidates[candidateIndex].indexOf(lowerWord) === 0) {
          completions.push(candidates[candidateIndex]);
        }
      }
      return completions;
    }
    function runHashCommand(argumentsText) {
      var algorithmPart;
      var firstPart = splitFirstWord(argumentsText);
      var operation = firstPart.word.toLowerCase();
      var pair;
      var passwordAlgorithmPart;
      var result;
      if (argumentsText.length > MAXIMUM_INPUT_LENGTH) {
        printHashStatus(
          "Input must be " + MAXIMUM_INPUT_LENGTH + " characters or fewer."
        );
        return;
      }
      if (operation.length === 0 || operation === "help") {
        printHashHelp();
        return;
      }
      algorithmPart = splitFirstWord(firstPart.remainder);
      if (operation === "digest") {
        result = cryptoJsDigest(
          algorithmPart.word.toLowerCase(),
          algorithmPart.remainder
        );
      } else if (operation === "checksum") {
        result = calculateChecksum(
          algorithmPart.word.toLowerCase(),
          algorithmPart.remainder
        );
      } else if (operation === "hmac") {
        pair = splitAtPipe(algorithmPart.remainder);
        if (pair === null) {
          printHashStatus("HMAC requires: <key> | <message>.");
          return;
        }
        result = cryptoJsHmac(
          algorithmPart.word.toLowerCase(),
          pair.left,
          pair.right
        );
      } else if (operation === "password") {
        passwordAlgorithmPart = splitFirstWord(firstPart.remainder);
        switch (passwordAlgorithmPart.word.toLowerCase()) {
          case "bcrypt":
            hashBcrypt(passwordAlgorithmPart.remainder);
            return;
          case "phpass":
            hashPhpass(passwordAlgorithmPart.remainder);
            return;
          case "crypt":
            pair = splitAtPipe(passwordAlgorithmPart.remainder);
            if (pair === null) {
              printHashStatus("DES crypt requires: <2-character-salt> | <password>.");
              return;
            }
            if (!/^[./0-9A-Za-z]{2}$/.test(pair.left)) {
              printHashStatus("DES crypt requires: <2-character-salt> | <password>.");
              return;
            }
            if (!/^[\x01-\x7F]{0,8}$/.test(pair.right)) {
              printHashStatus(
                "DES crypt password must contain at most 8 ASCII characters."
              );
              return;
            }
            printHashStatus((0, import_unix_crypt_td_js.default)(pair.right, pair.left));
            return;
          default:
            printHashStatus("Password algorithm must be bcrypt, phpass, or crypt.");
            return;
        }
      } else if (operation === "verify") {
        verifyPassword(firstPart.remainder);
        return;
      } else {
        printHashStatus("Unknown operation. Run /hash help.");
        return;
      }
      if (result.length === 0) {
        printHashStatus("Unknown algorithm. Run /hash help.");
        return;
      }
      printHashStatus(result);
    }
    birc.onCommand("hash", runHashCommand);
    birc.onComplete(completeHashCommand);
    birc.on("load", function printHashLoadMessage() {
      printHashStatus("Loaded. Run /hash help.");
    });
  })();
})();
/*! For license information please see birc-hash.js.LEGAL.txt */

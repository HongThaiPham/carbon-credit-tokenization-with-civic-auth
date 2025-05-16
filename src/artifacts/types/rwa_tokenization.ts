/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/rwa_tokenization.json`.
 */
export type RwaTokenization = {
  address: "5HMSSNbK5v5VCuReWUxG3mGksuWZmcsu9e9fMygTvyJw";
  metadata: {
    name: "rwaTokenization";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "initRwaToken";
      discriminator: [237, 107, 66, 161, 83, 139, 205, 17];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["configAccount"];
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "mintAuthority";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 97];
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
          };
        },
        {
          name: "mint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 99, 116];
              },
              {
                kind: "arg";
                path: "symbol";
              }
            ];
          };
        },
        {
          name: "transferHookProgram";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "decimals";
          type: "u8";
        },
        {
          name: "uri";
          type: "string";
        },
        {
          name: "isClose";
          type: "bool";
        },
        {
          name: "hasFee";
          type: "bool";
        },
        {
          name: "transferFeeBasisPoints";
          type: {
            option: "u16";
          };
        },
        {
          name: "maximumFee";
          type: {
            option: "u64";
          };
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "singer";
          writable: true;
          signer: true;
        },
        {
          name: "configAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "issueConsumerCert";
      discriminator: [29, 119, 198, 33, 255, 129, 195, 158];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "minter";
          writable: true;
          signer: true;
        },
        {
          name: "receiver";
        },
        {
          name: "minterNftMint";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109];
              },
              {
                kind: "account";
                path: "rwaMint";
              },
              {
                kind: "account";
                path: "minter";
              }
            ];
          };
        },
        {
          name: "rwaMint";
        },
        {
          name: "consumerController";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99];
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
          };
        },
        {
          name: "mint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99];
              },
              {
                kind: "account";
                path: "rwaMint";
              },
              {
                kind: "account";
                path: "receiver";
              }
            ];
          };
        },
        {
          name: "receiverTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "receiver";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        }
      ];
    },
    {
      name: "issueMinterCert";
      discriminator: [211, 103, 150, 50, 154, 142, 227, 197];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["configAccount"];
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "minterController";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109];
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
          };
        },
        {
          name: "receiver";
        },
        {
          name: "mint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109];
              },
              {
                kind: "account";
                path: "permissionedMint";
              },
              {
                kind: "account";
                path: "receiver";
              }
            ];
          };
        },
        {
          name: "receiverTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "receiver";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "permissionedMint";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        }
      ];
    },
    {
      name: "mintRwaToken";
      discriminator: [72, 70, 240, 192, 244, 80, 154, 203];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "minter";
          writable: true;
          signer: true;
        },
        {
          name: "receiver";
        },
        {
          name: "minterController";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109];
              },
              {
                kind: "account";
                path: "minterNftMint";
              }
            ];
          };
        },
        {
          name: "mintAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 97];
              },
              {
                kind: "account";
                path: "rwaMint";
              }
            ];
          };
        },
        {
          name: "rwaMint";
          writable: true;
        },
        {
          name: "receiverTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "receiver";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "rwaMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "minterNftMint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109];
              },
              {
                kind: "account";
                path: "rwaMint";
              },
              {
                kind: "account";
                path: "minter";
              }
            ];
          };
        },
        {
          name: "minterNftTokenAccount";
          pda: {
            seeds: [
              {
                kind: "account";
                path: "minter";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "minterNftMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "retireToken";
      discriminator: [226, 89, 231, 200, 108, 28, 18, 183];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "consumer";
          writable: true;
          signer: true;
        },
        {
          name: "mintAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 97];
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
          };
        },
        {
          name: "mint";
          writable: true;
        },
        {
          name: "consumerTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "consumer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "nftMint";
          writable: true;
          signer: true;
        },
        {
          name: "consumerNftTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "consumer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "nftMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "updateQuotaCredit";
      discriminator: [229, 184, 26, 71, 201, 124, 38, 234];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "minterController";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109];
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
          };
        },
        {
          name: "receiver";
        },
        {
          name: "mint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109];
              },
              {
                kind: "account";
                path: "permissionedMint";
              },
              {
                kind: "account";
                path: "receiver";
              }
            ];
          };
          relations: ["minterController"];
        },
        {
          name: "permissionedMint";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        }
      ];
      args: [
        {
          name: "newCredit";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "consumerController";
      discriminator: [45, 211, 177, 38, 29, 146, 215, 169];
    },
    {
      name: "governanceConfig";
      discriminator: [81, 63, 124, 107, 210, 100, 145, 70];
    },
    {
      name: "mintAuthority";
      discriminator: [148, 0, 219, 228, 254, 237, 76, 128];
    },
    {
      name: "minterController";
      discriminator: [245, 95, 65, 190, 225, 54, 39, 54];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "insufficientCredits";
      msg: "Insufficient credits";
    },
    {
      code: 6001;
      name: "overflow";
      msg: "overflow";
    },
    {
      code: 6002;
      name: "noCredits";
      msg: "No credits";
    },
    {
      code: 6003;
      name: "invalidAmount";
    },
    {
      code: 6004;
      name: "insufficientBalance";
    },
    {
      code: 6005;
      name: "invalidCredit";
    }
  ];
  types: [
    {
      name: "consumerController";
      type: {
        kind: "struct";
        fields: [
          {
            name: "rwaMint";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "governanceConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "isInitialized";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "mintAuthority";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "transferHook";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "minterController";
      type: {
        kind: "struct";
        fields: [
          {
            name: "rwaMint";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
  constants: [
    {
      name: "governanceConfigSeed";
      type: "bytes";
      value: "[99, 111, 110, 102, 105, 103]";
    }
  ];
};

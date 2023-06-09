import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MyAccount } from "../target/types/my_account";

describe("my-account", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.MyAccount as Program<MyAccount>;

  const wallet = provider.wallet as anchor.Wallet;
  const myAccountPda = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from(anchor.utils.bytes.utf8.encode("my_account")), wallet.publicKey.toBuffer()], program.programId)[0];

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize()
                    .accounts({
                      signer: wallet.publicKey,
                      systemProgram: anchor.web3.SystemProgram.programId,
                      myAccount: myAccountPda,
                    }).signers([wallet.payer]).rpc();
    console.log("Your transaction signature", tx);
  });
});

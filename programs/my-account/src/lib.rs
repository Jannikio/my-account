use anchor_lang::prelude::*;
use std::mem::size_of;

declare_id!("F4yR3sVXG41rqyc22x53dVnUhYpN5TdxmCPVwXSZpmKD");

#[program]
pub mod my_account {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.my_account.data = 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
    #[account(init, payer = signer, space = 8 + size_of::<MyAccount>(), seeds = [b"my_account".as_ref(), signer.key.as_ref()], bump)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    pub data: u64,
}


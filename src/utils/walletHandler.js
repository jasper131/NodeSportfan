import dotEnv from 'dotenv';
import Sequelize, {
  Op, fn, col, and,
} from 'sequelize';

import model from '../models';
import helperMethods from './helpers';

const { Admin_wallet_history, Wallet } = model;

dotEnv.config();

const WalletHandler = {
  deductMoney(formerBalance, price) {
    return formerBalance - price;
  },
  addMoney(formerBalance, price) {
    return formerBalance + price;
  },
  removeAdminPercentage(price, percentage) {
    return (price / 100) * percentage;
  },
  // credit admin wallet
  async creditAdmin(amount, user_uuid) {
    const admin_uuid = `${process.env.ADMIN_UUID}`;
    const admin_wallet = await helperMethods.findAWalletByUser(Wallet, admin_uuid);
    if (admin_wallet) return false;
    const new_balance = this.addMoney(admin_wallet.balance, amount);
    await helperMethods.updateAUsersWallet(Wallet, new_balance, admin_uuid);
    await Admin_wallet_history.create({
      user_uuid,
      transaction_type: 'credit',
      purpose: 'deduction',
      status: 'success',
      balance: new_balance,
      amount,
    });
    return true;
  },
};

export default WalletHandler;

import React from 'react';
import 'promise-polyfill';
import '@terminus/react-native-octopus/src/polyfill';
import { request } from '@terminus/mall-utils';
import { getTumbler } from 'configs/tumbler';
import { requestCommonConfig } from 'configs/request';
import { Route, Router, TabRouter, Subpackage } from '@terminus/octopus-router';
import { supportPathRouter } from 'configs/navigators';
import 'styles/mp-styles.less';

import Entry from 'pages/entry/index';
import Home from 'pages/home/index';
import Apps from 'pages/apps/index';
import Report from 'pages/report/index';
import Account from 'pages/account/index';
import WebPage from 'pages/web-page/index';
// import PrivacyAgreement from 'pages/privacy-agreement/index';
import SelectStore from 'pages/select-store/index';
import SelectStoreMultiple from 'pages/select-store-multiple/index';
import Article from 'pages/article/index';
import MemberRegister from 'pages/member-register/index';
import PointOrder from 'pages/point-order/index';
import PointOrderDetail from 'pages/point-order-detail/index';
import UserCenter from 'pages/user-center/index';
import BusinessTimeChange from 'pages/business-time-change/index';

import StoreOrder from 'pages/store-order/index';
import OrderCycle from 'pages/store-order/children/orderCycle';
import Confirmation from 'pages/store-order/children/confirmation';
import ProductDetails from 'pages/store-order/children/productDetails';
import OrderConfirm from 'pages/store-order/children/orderConfirm';
import ViewDelivery from 'pages/store-order/children/viewDelivery';
import OrderPay from 'pages/store-order/children/orderPay';
import OrderInfo from 'pages/store-order/children/orderInfo';

import StoreReturn from 'pages/store-return/index';
import StoreReturnDetail from 'pages/store-return-detail/index';
import home from 'images/tab/home.png';
import homeActive from 'images/tab/home-active.png';
import apps from 'images/tab/apps.png';
import appsActive from 'images/tab/apps-active.png';
import report from 'images/tab/report.png';
import reportActive from 'images/tab/report-active.png';
import account from 'images/tab/account.png';
import accountActive from 'images/tab/account-active.png';
import StoreTransfer from 'pages/store-transfer';
import SelectProduct from 'pages/select-product';
import SearchProduct from 'pages/search-product';

import { getEnv } from 'configs/env-register/index.mp';

import AdjustApply from 'pages/adjust-apply';
import NewAdjust from 'pages/adjust-apply/children/newAdjust';
import AdjustDetails from 'pages/adjust-apply/children/adjustDetails';
import NewTransfer from 'pages/store-transfer/children/newTransfer';
import AddGoods from 'pages/store-transfer/children/addGoods';
import TransferDetails from 'pages/store-transfer/children/transferDetails';
import ProductRecall from 'pages/product-recall';
import RecallApplication from 'pages/product-recall/children/recallApplication';
import QuantityTable from 'pages/product-recall/children/quantityTable';
import CashPayment from 'pages/cash-payment';
import NewReceipts from 'pages/cash-payment/children/newReceipts';
import ReceiptsDetails from 'pages/cash-payment/children/ReceiptsDetails';

const env = getEnv();

request.initRequestConfig({
  autoWechatCookie: true,
  // 请求发出之前
  beforeSend: (api, options) => {
    return {
      url: /https?:\/\//.test(api) ? api : `${env.url}${api}`,
      options: {
        ...options,
        headers: {
          'Trantor-Appkey': 'mix',
          ...options.headers,
          'Accept-Language': 'zh-CN',
        },
      },
    };
  },
  ...requestCommonConfig,
} as any);

const Wrapper = getTumbler().getWrapper();

supportPathRouter('');

class Index extends React.Component {
  render() {
    const { children } = this.props as any;
    return (
      <Wrapper>
        <Router>
          <Route name="Entry" component={Entry} alias="entry" />
          <TabRouter text="首页" iconPath={home} selectedIconPath={homeActive}>
            <Route name="Home" component={Home} alias="index" />
          </TabRouter>
          <TabRouter text="全部应用" iconPath={apps} selectedIconPath={appsActive}>
            <Route name="Apps" component={Apps} alias="apps" />
          </TabRouter>
          <TabRouter text="数据分析" iconPath={report} selectedIconPath={reportActive}>
            <Route name="Report" component={Report} alias="report" />
          </TabRouter>
          <TabRouter text="我的账户" iconPath={account} selectedIconPath={accountActive}>
            <Route name="Account" component={Account} alias="account" />
          </TabRouter>
          <Route name="Article" component={Article} alias="article/:articleId" />
          <Route name="WebPage" component={WebPage} alias="webPage" />
          <Subpackage name="package" root="package">
            <Route name="SelectStore" component={SelectStore} alias="select-store" />
            <Route name="SelectStoreMultiple" component={SelectStoreMultiple} alias="select-store-multiple" />
            <Route name="MemberRegister" component={MemberRegister} alias="member-register" />
            <Route name="PointOrder" component={PointOrder} alias="point-order" />
            <Route name="PointOrderDetail" component={PointOrderDetail} alias="point-order-detail" />
            <Route name="UserCenter" component={UserCenter} alias="user-center" />
            <Route name="BusinessTimeChange" component={BusinessTimeChange} alias="business-time-change" />
            <Route name="StoreOrder" component={StoreOrder} alias="store-order" />
            <Route name="OrderCycle" component={OrderCycle} alias="order-cycle" />
            <Route name="Confirmation" component={Confirmation} alias="confirmation" />
            <Route name="ProductDetails" component={ProductDetails} alias="product-details" />
            <Route name="OrderConfirm" component={OrderConfirm} alias="order-confirm" />
            <Route name="ViewDelivery" component={ViewDelivery} alias="view-delivery" />
            <Route name="OrderPay" component={OrderPay} alias="order-pay" />
            <Route name="OrderInfo" component={OrderInfo} alias="order-info" />
            <Route name="StoreReturn" component={StoreReturn} alias="store-return" />
            <Route name="StoreReturnDetail" component={StoreReturnDetail} alias="store-return-detail" />
            <Route name="AdjustApply" component={AdjustApply} alias="adjust-apply" />
            <Route name="NewAdjust" component={NewAdjust} alias="new-adjust" />
            <Route name="AdjustDetails" component={AdjustDetails} alias="adjust-details" />
            <Route name="StoreTransfer" component={StoreTransfer} alias="store-transfer" />
            <Route name="SelectProduct" component={SelectProduct} alias="select-product" />
            <Route name="SearchProduct" component={SearchProduct} alias="search-product" />
            <Route name="NewTransfer" component={NewTransfer} alias="new-transfer" />
            <Route name="AddGoods" component={AddGoods} alias="add-goods" />
            <Route name="TransferDetails" component={TransferDetails} alias="transfer-details" />
            <Route name="ProductRecall" component={ProductRecall} alias="product-recall" />
            <Route name="RecallApplication" component={RecallApplication} alias="recall-application" />
            <Route name="QuantityTable" component={QuantityTable} alias="quantity-table" />
            <Route name="CashPayment" component={CashPayment} alias="cash-payment" />
            <Route name="NewReceipts" component={NewReceipts} alias="new-receipts" />
            <Route name="ReceiptsDetails" component={ReceiptsDetails} alias="receipts-details" />
          </Subpackage>
        </Router>
        {children}
      </Wrapper>
    );
  }
}

export default Index;

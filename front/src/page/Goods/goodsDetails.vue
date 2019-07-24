<!--商品详情-->
<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li v-for="(item,i) in small" :key="i" :class="{on:big===item}" @click="big=item">
                <img v-lazy="item" :alt="product.productName" />
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="big" :alt="product.productName" />
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{product.productName}}</h4>
          <h6>
            <span style="width:70%">{{product.subTitle}}</span>
            <span class="price">
              <em>¥</em>
              <i>{{product.salePrice.toFixed(2)}}</i>
            </span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num @edit-num="editNum" :limit="Number(product.limitNum)"></buy-num>
        </div>
        <div class="buy">
          <y-button
            text="加入购物车"
            @btnClick="addCart(product.productId,product.salePrice,product.productName,product.big)"
            classStyle="main-btn"
            style="width: 145px;height: 50px;line-height: 48px"
          ></y-button>
          <y-button
            text="现在购买"
            @btnClick="checkout(product.productId)"
            style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"
          ></y-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <y-shelf title="产品信息">
        <div slot="content">
          <!-- <div class="img-item" v-if="productMsg">
            <div v-html="productMsg">{{ productMsg }}</div>
          </div>-->
          <div class="no-info">
            <img src="/static/images/no-data.png" />
            <br />该商品暂无内容数据
          </div>
        </div>
      </y-shelf>
    </div>
    <div class="item-info">
      <y-shelf :title="'商品评价'+ '('+evalList.length+')'">
        <div slot="content">
          <div class="eval" v-for="(item,i) in evalList">
            <img style="height:50px;width:50px;margin-right:20px" :src="item.userId%2===0?'https://s2.ax1x.com/2019/07/23/eFarwt.png':'https://s2.ax1x.com/2019/07/23/eFaDeI.png'" alt="">
            <div>
              <el-rate
                v-model="item.stars"
                disabled
                show-text
                text-color="#ff9900"
                style="margin-bottom:10px"
              ></el-rate>
              <span style="font-size:18px;color:#383838;">{{item.evaluation}}</span>
            </div>
          </div>
        </div>
      </y-shelf>
    </div>
  </div>
</template>
<script>
import { productDet, addCart, goodEvaluateList } from '/api/goods'
import { mapMutations, mapState } from 'vuex'
import YShelf from '/components/shelf'
import BuyNum from '/components/buynum'
import YButton from '/components/YButton'
import { getStore } from '/utils/storage'
export default {
  data () {
    return {
      productMsg: {},
      small: [],
      big: '',
      product: {
        salePrice: 0
      },
      productNum: 1,
      userId: '',
      evalList: []
    }
  },
  computed: {
    ...mapState(['login', 'showMoveImg', 'showCart'])
  },
  methods: {
    ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
    _productDet (productId) {
      productDet({ productId }).then(res => {
        let result = res.result
        result.productName = result.goodName
        result.big = result.productImg
        this.product = result
        this.product.limitNum = 100
        this.big = result.productImg
        this.small = []
        this.small.push(this.big)
      })
    },
    addCart (id, price, name, img) {
      if (!this.showMoveImg) {     // 动画是否在运动
        if (this.login) { // 登录了 直接存在用户名下
          addCart({ userId: this.userId, productId: id, productNum: this.productNum }).then(res => {
            // 并不重新请求数据
            this.ADD_CART({
              productId: Number(id),
              salePrice: price,
              productName: name,
              productImg: img,
              productNum: Number(this.productNum)
            })
          })
        } else { // 未登录 vuex
          this.ADD_CART({
            productId: Number(id),
            salePrice: price,
            productName: name,
            productImg: img,
            productNum: Number(this.productNum)
          })
        }
        // 加入购物车动画
        var dom = event.target
        // 获取点击的坐标
        let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
        let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
        // 需要触发
        this.ADD_ANIMATION({ moveShow: true, elLeft: elLeft, elTop: elTop, img: img })
        if (!this.showCart) {
          this.SHOW_CART({ showCart: true })
        }
      }
    },
    checkout (productId) {
      this.$router.push({ path: '/checkout', query: { productId, num: this.productNum } })
    },
    editNum (num) {
      this.productNum = parseInt(num)
    },

    _goodEvaluateList (goodId) {
      goodEvaluateList({ goodId }).then(res => {
        let result = res.result
        
        this.evalList = result
        
      })
    }
  },
  components: {
    YShelf, BuyNum, YButton
  },
  created () {
    let id = this.$route.query.productId
    this._productDet(id)
    this._goodEvaluateList(id)
    this.userId = getStore('userId')
    console.log(this.login)
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixin';

.store-content {
  clear: both;
  width: 1220px;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
}

.gray-box {
  display: flex;
  padding: 60px;
  margin: 20px 0;
  .gallery-wrapper {
    .gallery {
      display: flex;
      width: 540px;
      .thumbnail {
        li:first-child {
          margin-top: 0px;
        }
        li {
          @include wh(80px);
          margin-top: 10px;
          padding: 12px;
          border: 1px solid #f0f0f0;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 5px;
          cursor: pointer;
          &.on {
            padding: 10px;
            border: 3px solid #ccc;
            border: 3px solid rgba(0, 0, 0, 0.2);
          }
          img {
            display: block;
            @include wh(100%);
          }
        }
      }
      .thumb {
        .big {
          margin-left: 20px;
        }
        img {
          display: block;
          @include wh(440px);
        }
      }
    }
  }
  // 右边
  .banner {
    width: 450px;
    margin-left: 10px;
    h4 {
      font-size: 24px;
      line-height: 1.25;
      color: #000;
      margin-bottom: 13px;
    }
    h6 {
      font-size: 14px;
      line-height: 1.5;
      color: #bdbdbd;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sku-custom-title {
      overflow: hidden;
      padding: 8px 8px 18px 10px;
      position: relative;
    }
    .params-name {
      padding-right: 20px;
      font-size: 14px;
      color: #8d8d8d;
      line-height: 36px;
    }
    .num {
      padding: 29px 0 8px 10px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
    }
    .buy {
      position: relative;
      border-top: 1px solid #ebebeb;
      padding: 30px 0 0 10px;
    }
  }
}

.item-info {
  .gray-box {
    padding: 0;
    display: block;
  }
  .img-item {
    width: 1220px;
    // padding: 1vw;
    text-align: center;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.no-info {
  padding: 200px 0;
  text-align: center;
  font-size: 30px;
}

.price {
  display: block;
  color: #d44d44;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
  i {
    padding-left: 2px;
    font-size: 24px;
  }
}

.eval {
  padding: 20px;
  border-bottom: 1px #eeeeee solid;
  display: flex;
  flex-direction: row;
}
</style>

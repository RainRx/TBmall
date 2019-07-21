## 首页
### 1.获取首页内容
路由:/productHome  
前端请求参数:{}  

``` js
后端返回: 
{
    success,
    message,
    data:[
    {
        name,
        panelContents:[
        {
            productId,
            salePrice,
            picUrl,
            subTitle,
            productName
        },{},...]
    },{},...]}
```

### 2.获取分类列表
路由:/goods/navList 
前端请求参数:{}  
``` js
后端返回:{success, message, result}
```

## 商品

### 1.获取所有商品
路由:/goods/allGoods  
前端请求参数:{cid,page}  //cid: 分类id
```js
后端返回: {success, message, result:[{productId, productName, subTitle, salePrice, picUrl},{},...]}
```

### 2.获取购物车列表
路由:/member/cartList  
前端请求参数:{userId}  
``` js
后端返回:{success,message, result:[{productId, productName, subTitle, salePrice, productImg},{},...]}
```

### 3.获取分类列表
路由:/goods/navList 
前端请求参数:{userId}  
``` js
后端返回:{success, message, result}
```

## 地址
### 1.获取收货地址
路由:/member/addressList
前端请求参数:{userId}  
``` js
后端返回:{success, result:[{
    addressId,
    streetName,
    tel,
    userId,
    userName,
    isDefault
},{},...]}
```

### 2.修改收货地址
路由:/member/updateAddress
前端请求参数:{
    addressId,
    streetName,
    tel,
    userId,
    userName,
    isDefault
}  

``` js
后端返回:{success,message}
```

### 3.添加收货地址
路由:/member/addAddress
前端请求参数:{
    streetName,
    tel,
    userId,
    userName,
    isDefault
}  

``` js
后端返回:{success,message}
```

### 4.删除收获地址
路由:/member/delAddress
前端请求参数:{
    addressId
}  

``` js
后端返回:{success,message}
```

## 订单

### 1.生成订单
路由:/member/addOrder
前端请求参数:{
    userId,
    tel,
    userName,
    streetName,
    goodsList: array,
    orderTotal
}  

``` js
后端返回:{success,message}
```

### 2.获取用户订单
路由:/member/orderList
前端请求参数:{
    userId
}  

``` js
后端返回:{success,message,result:[{
    orderId,
    createDate,
    goodsList,
    orderStatus, //订单状态
    orderTotal //总金额
}]}
```

### 3.删除订单
路由:/member/cancelOrder
前端请求参数:{
    userId
}  

``` js
后端返回:{success,message,result:[{
    orderId,
    createDate,
    goodsList,
    orderStatus, //订单状态
    orderTotal //总金额
}]}
```

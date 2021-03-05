const express = require('express')
// const Mock = require('mockjs')
const app = express()
const bodyParser = require('body-parser')

var io = require('socket.io')(require('http').Server(app));
io.on('connection', function(socket) {
   //接受消息
   console.log('--------')
   socket.on('message', function (msg) {
       console.log('receive messge : ' + msg );
   });
   
   //发送消息
   socket.emit('message', 'hello');
   
   //断开连接回调
   socket.on('disconnect', function () { 
       console.log('socket disconnect');
   });
})
// const ws = require("nodejs-websocket")
// let game1 = null,game2 = null , game1Ready = false , game2Ready = false
// const server = ws.createServer(function(conn){
//   conn.on("text", function (str) {
//       console.log("收到的信息为:"+str)
//       if(str==="game1"){
//           game1 = conn;
//           game1Ready = true;
//           conn.sendText("success");
//       }
//       if(str==="game2"){
//           game2 = conn;
//           game2Ready = true;
//       }

//       if(game1Ready&&game2Ready){
//           game2.sendText(str);
//       }

//       conn.sendText(str)
//   })
//   conn.on("close", function (code, reason) {
//       console.log("关闭连接")
//   });
//   conn.on("error", function (code, reason) {
//       console.log("异常关闭")
//   });
// })

app.use(bodyParser.urlencoded({extended: false}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
})
app.post('/doLogin', (req, res) => {
  console.log(req.body.username)
  if(req.body.username === 'admin' && req.body.password === '123456') {
    setTimeout(function() {
      res.json({
        status: 0,
        re: {
          loginStatus: '1',
          ifAdmin: true,
          employeePermissionList: [],
          loginStatusDesc: '在线'
        }
      })
    }, 1000)
  } else {
    res.json({
      status: 0,
      msg: '账号或密码错误'
    })
  }
})
app.get('/getYzmImage', (req, res) => {
  res.json({
    status: 0,
    re: {
      img: '',
    }
  })
})
app.post('/logout', (req, res) => {
  setTimeout(function() {
    res.json({
      status: 0,
      re: {}
    })
  }, 1000)
})
app.post('/distributeMaps', (req, res) => {
  setTimeout(function() {
    res.json({
      status: 0,
      re: {
        driverList: [
          {
            workStatusStr: "上班",
            serviceStatus: 2,
            secondWorkStatusStr: "正常上班",
            driverId: 2890577,
            vehicleModelName: "奥迪A61",
            longitude: "117.392882",
            latitude: "39.159421",
            driverName: "吕琦",
            vehicleNo: "津YYR1799",
            mobile: "16611110017",
          },
          {
            workStatusStr: "上班",
            serviceStatus: 6,
            secondWorkStatusStr: "正常上班",
            driverId: 2890577,
            vehicleModelName: "奥迪A61",
            longitude: "117.352882",
            latitude: "39.159421",
            driverName: "吕琦",
            vehicleNo: "津YYR1799",
            mobile: "16611110017",
          },
          {
            workStatusStr: "上班",
            serviceStatus: 99,
            secondWorkStatusStr: "正常上班",
            driverId: 2890577,
            vehicleModelName: "奥迪A61",
            longitude: "117.332882",
            latitude: "39.159421",
            driverName: "吕琦",
            vehicleNo: "津YYR1799",
            mobile: "16611110017",
          },
        ]
      }
    })
  }, 1000)
})
app.listen('8090', () => {
  console.log('listen 8090')
})
import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from 'antd'
import { requestDriverSpreadList } from '../../../../actions/driverSpread'
import io from 'socket.io-client'
import './index.less'
import DriverSpreadMap from './DriverSpreadMap'

export interface ICityObj {
  province: string;
  city: string;
}
/**
 * 司机分布包含表单和地图及司机数量展示
 * @params 无
 */

function DriverSpread() {
  const dispatch = useDispatch();
  // enums为司机上班状态,carGroupList为服务车组
  // const { enums = {}, carGroupList = [] } = useSelector((s: any) => s.home);
  const { driverList } = useSelector((s: any) => s.driverSpread)

  // 聚合图打开/关闭 mergeStatus = on' | 'off'
  const [mergeStatus, setMergeStatus] = useState(false);
  // 存储待提交的信息
  // const [searchValues, setSearchValues] = useState();

  useEffect(() => {
    if(window.WebSocket){
      const ws = io('http://localhost:3000');
      ws.on('connect', function(){
        console.log('connect');
    });
      // ws.onopen = function(e){
      //     console.log("连接服务器成功", e);
      //     ws.send("game2");
      // }
      // ws.onclose = function(e){
      //     console.log("服务器关闭", e);
      // }
      // ws.onerror = function(){
      //     console.log("连接出错");
      // }

      // ws.onmessage = function(e){
      //   console.log(e)
      // }
    }
  },[])

  useEffect(() => {
    dispatch(requestDriverSpreadList())
  }, [dispatch])

  // 当前城市信息
  // const currentCity = useMemo(() => {
  //   if (cityList && searchValues) {
  //     return cityList.find((i: any) => i.cityId === searchValues.cityId);
  //   }
  //   return {};
  // }, [cityList, searchValues]);

  // 查询按钮查询司机分布
  // function handleSearchSubmit(values: ISearchValues) {
  //   if (!isObjectValueEqual(values, searchValues)) {
  //     // 请求内容改变才需要请求新数据
  //     setSearchValues(values);
  //   }
  // }

  // 判断查询的对象和上一次查询的对象是否相等
  // function isObjectValueEqual(objA: Object, objB: Object) {
  //   const aProps = Object.getOwnPropertyNames(objA);
  //   const bProps = Object.getOwnPropertyNames(objB);
  //   if (aProps.length !== bProps.length) {
  //     return false;
  //   }
  //   for (let i = 0; i < aProps.length; i += 1) {
  //     const propName = aProps[i];
  //     if (objA[propName] !== objB[propName]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // 拖动查询司机分布
  // function handleMapMove({ city, province }: ICityObj) {
  //   const mapMoveCity = city || province;
  //   // 判断是否是当前城市. 如果是则不重新获取数据
  //   if (!mapMoveCity.includes(currentCity.cityName)) {
  //     const cityInfo: any = cityList.find((item: any) =>
  //       mapMoveCity.includes(item.cityName)
  //     );
  //     if (cityInfo) {
  //       setSearchValues({
  //         ...searchValues,
  //         cityId: cityInfo.cityId,
  //       });
  //     }
  //   }
  // }

  return (
    <div className="driver-spread-search">
      <div className="driver-spread-map">
        <Card
          style={{ width: '80%', height: '600px' }}
          className="driver-spread-map-content"
        >
          <DriverSpreadMap
            mergeStatus={mergeStatus}
            // selectCityMsg={currentCity}
            driverList={driverList}
            // onMapMove={handleMapMove}
          />
          <div className="merge-map">
            <Button
              className="show-merge"
              onClick={() => {
                setMergeStatus(true)
              }}
            >
              显示司机聚合图
            </Button>
            <Button
              className="hide-merge"
              onClick={() => {
                setMergeStatus(false)
              }}
            >
              关闭司机聚合图
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default React.memo(DriverSpread)

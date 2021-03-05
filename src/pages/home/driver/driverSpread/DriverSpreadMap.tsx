/// <reference path="../../../../react-app-env.d.ts"
import React, { useState, useEffect, useMemo, useRef } from 'react'
// 引入司机状态图标
import { Map, ArrayLngLat, Markers, InfoWindow } from 'react-amap'
import classnames from 'classnames'
import { ICityObj } from '.'
// 司机状态图标
const statusMap = {
  '2': 'free',
  '18': 'start',
  '5': 'arrival',
  '6': 'serviceStart',
  '0': 'offwork',
  '99': 'other',
};

// 查看司机信息的文本内容
const NAME_LIST = {
  driverId: '司机ID',
  mobile: '手机号',
  vehicleModelName: '车型',
  vehicleNo: '车牌号',
  workStatusStr: '上班状态',
  secondWorkStatusStr: '二级状态',
}
interface IDriverListItem {
  driverId: Number;
  mobile: string;
  vehicleModelName: string;
  vehicleNo: string;
  serviceStatus: string;
  secondWorkStatusStr: string;
  driverName?: string;
  longitude: number;
  latitude: number;
}

interface ISpreadMap {
  mergeStatus: boolean; // 是否聚合marker
  selectCityMsg?: any; // 当前城市信息 （name和id）
  driverList: Array<IDriverListItem>; // 查询到的司机分布信息
  autocompleteDOMID?: string; // autocomplete dome id
  onMapMove?: (city: ICityObj) => void;
}
/**
 * 司机分布地图展示
 * @param mergeStatus 打开/关闭聚合图 'on' | 'off'
 */
function SpreadMap({
  mergeStatus,
  selectCityMsg,
  driverList,
  onMapMove,
  autocompleteDOMID = 'place',
}: ISpreadMap) {
  // 地图实例
  const [map, setMap] = useState<any>();
  // 城市经纬度
  const [cityCod, setCityCod] = useState<ArrayLngLat>([116.4, 39.43]);
  // amapgeocoder
  const [geocoder, setGeocoder] = useState<any>();
  // 当前infowindow数据
  const [currentDriverData, setCurrentDriverData] = useState<IDriverListItem>();
  // 是否显示infowindow
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  // 是否已加载 amap autocomplete plugin
  const [autocompleteloaded, setAutocompleteloaded] = useState(false);

  // autocomplete plugin组件实例
  const autocompleteRef = useRef<any>();
  // 城市变更时重新定位中心点
  useEffect(() => {
    if (selectCityMsg && geocoder) {
      geocoder.getLocation(selectCityMsg.cityName, (_: any, result: any) => {
        if (
          result &&
          result.geocodes &&
          result.geocodes.length &&
          result.geocodes[0].location
        ) {
          const location = result.geocodes[0].location;
          const nowCod: ArrayLngLat = [location.lng, location.lat];
          setCityCod(nowCod);
        }
      });
    }
  }, [geocoder, selectCityMsg]);

  // 加载autocomplete plugin
  useEffect(() => {
    if (!autocompleteloaded || !autocompleteDOMID) {
      return;
    }

    // 构造模糊查询元素
    const autoOptions = {
      input: autocompleteDOMID,
      city: '北京',
      citylimit: true,
    };

    const autocomplete =
      autocompleteRef.current || new window.AMap.Autocomplete(autoOptions);

    autocompleteRef.current = autocomplete;
    // 设置cityName
    if (selectCityMsg) {
      autocomplete.setCity(selectCityMsg.cityName);
    }

    // https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.Autocomplete
    const event = window.AMap.event.addListener(
      autocomplete,
      'select',
      (e: any) => {
        if (e.poi.location) {
          setCityCod([e.poi.location.lng, e.poi.location.lat]);
        }
      }
    );
    // 不重复绑定事件
    return () => {
      if (autocompleteloaded && event) {
        window.AMap.event.removeListener(event);
      }
    };
    
  }, [autocompleteloaded, autocompleteDOMID, selectCityMsg]); // 注意:autocompleteDOMID变更时不会切换input, 有需要单独写

  // markers数据
  const markerList = useMemo(() => {
    if (!map) return [];
    return driverList.map((item: IDriverListItem) => {
      const { longitude, latitude, serviceStatus }: IDriverListItem = item
      return {
        position: {
          longitude,
          latitude,
        },
        serviceStatus,
        data: item,
      }
    })
  }, [driverList, map])

  /**
   * 渲染地图标记
   * @param ops
   */
  function renderMakers(ops: any) {
    return (
      <div
        className={classnames('marker-view', [statusMap[ops.serviceStatus]])}
      />
    );
  }
  return (
    // https://elemefe.github.io/react-amap/components/markers#Markers-events-%E4%BA%8B%E4%BB%B6
    <Map
      amapkey="9485a49f9f98bc7ca669f6327dd591ae"
      version="1.4.10"
      viewMode="2D"
      plugins={['ToolBar', 'Scale', 'MapType']}
      events={{
        created: (ins: any) => {
          setMap(ins);
          window.AMap.plugin(['AMap.Geocoder'], () => {
            setGeocoder(new window.AMap.Geocoder({}));
          });
          window.AMap.plugin(['AMap.Autocomplete'], () => {
            setAutocompleteloaded(true);
          });
        },
        dragend: () => {
          if (map && onMapMove) {
            map.getCity((e: ICityObj) => {
              onMapMove(e);
            });
          }
        },
      }}
      zoom={11}
      center={cityCod}
      resizeEnable
    >
      <Markers
        markers={markerList}
        useCluster={mergeStatus}
        render={renderMakers}
        events={{
          click: (originalMapsEvents: any, originalMarkerInstance: any) => {
            if (
              originalMapsEvents &&
              originalMarkerInstance &&
              originalMarkerInstance.getExtData() &&
              originalMarkerInstance.getExtData().data
            ) {
              setCurrentDriverData(originalMarkerInstance.getExtData().data);
              setShowInfoWindow(true);
            }
          },
        }}
      />

      {currentDriverData ? (
        // https://elemefe.github.io/react-amap/components/infowindow
        <InfoWindow
          position={[currentDriverData.longitude, currentDriverData.latitude]}
          visible={showInfoWindow}
          isCustom
          offset={[3, -45]}
        >
          <div className="info-window-card">
            <div className="info-title">
              {currentDriverData.driverName}
              <span
                onClick={() => {
                  setShowInfoWindow(false)
                }}
              />
            </div>
            <ul>
              {Object.keys(NAME_LIST).map((name: string) => {
                if (currentDriverData[name]) {
                  return (
                    <li className="info-msg" key={`driver-info-item-${name}`}>
                      <p>{NAME_LIST[name]} :</p>
                      <p>{currentDriverData[name]}</p>
                    </li>
                  )
                }
                return null
              })}
            </ul>
          </div>
        </InfoWindow>
      ) : null}
    </Map>
  )
}

export default React.memo(SpreadMap)



import { CustomMap, MapType, Point, CustomPoi } from "./CustomMap"


declare var AMap: any;

const initGeocoder = () => {
  return new Promise((resolve) => {
    AMap.service(["AMap.Geocoder"], (_: any) => {
      const geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
      resolve(geocoder)
    });
  })

}
export class GaodeMap implements CustomMap {
  geocoder: any;
  constructor() {
    AMap.service(["AMap.Geocoder"], (_: any) => {
      this.geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
    });
  }


  getAddress(point: Point): Promise<CustomPoi[]> {
    return new Promise(async (resolve, reject) => {

      if (!this.geocoder) {
        this.geocoder = await initGeocoder();
      }
      var lnglatXY = new AMap.LngLat(point.lng, point.lat);
      this.geocoder.getAddress(lnglatXY, function (status: any, result: any) {
        if (status === 'complete' && result.info === 'OK') {
          var addrComp = result.regeocode.addressComponent;
          /*var _city = addrComp.city || addrComp.province;
           addrComp.city = self.formatCityname(_city);*/
          var poiList = result.regeocode.pois.map(function (poi: any) {
            return {
              poiId: poi.id,
              name: poi.name,
              address: poi.address || poi.name,
              lng: poi.location.lng,
              lat: poi.location.lat,
              city: addrComp.city || addrComp.province,
              citycode: addrComp.citycode,
              province: addrComp.province,
              district: addrComp.district,
            };
          });
          resolve(poiList)
        } else {
          reject(null)
        }
      })

    })

  }
}

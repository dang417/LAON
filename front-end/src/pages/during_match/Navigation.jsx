import React, { useEffect, useState, useRef } from 'react'
import './styles/Navigation.css';
import navigationMap from './img/navigation.png'
// import EntireSectionMapImg from './img/sectionMap.png';
import map2F from './img/coordinate_2F.png';
import map3F from './img/coordinate_3F.png';
import map5F from './img/coordinate_5F.png';

export default function Navigation() {
  const naviCanvasRef = useRef(null);
  const [floor, setFloor] = useState(map2F)
  // const [currentFloor, setCurrentFloor] = useState('3F')

  // const naviGoal = data.facilityName;
  const naviGoal = '파파존스피자(Food Street)';
  const pointDtoList = {
    0: {pointId: 314, pointName: '3-1', type: 'G', x: 20, y: 150},
    1: {pointId: 313, pointName: '3-2', type: 'G', x: 20, y: 200},
    2: {pointId: 312, pointName: '3-3', type: 'G', x: 20, y: 250},
    3: {pointId: 311, pointName: '3-4', type: 'G', x: 20, y: 300},
    4: {pointId: 309, pointName: '3-5', type: 'G', x: 50, y: 330},
    5: {pointId: 308, pointName: '3-6', type: 'G', x: 80, y: 360},
    6: {pointId: 307, pointName: '3-7', type: 'G', x: 110, y: 390},
    7: {pointId: 306, pointName: '3-8', type: 'G', x: 140, y: 420},
    8: {pointId: 305, pointName: '3-9', type: 'G', x: 200, y: 420},
    9: {pointId: 304, pointName: '3-10 기둥 근처 계단', type: 'S', x: 200, y: 450},
    10: {pointId: 227, pointName: 'Food Street 내부 계단', type: 'S', x: 200, y: 450},
    11: {pointId: 225, pointName: '2층 게이트3', type: 'G', x: 160, y: 450},
    12: {pointId: 224, pointName: '2층 게이트2', type: 'G', x: 70, y: 360}
  }

  // function getCoordinate(e) {
  //   console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  //   const x = e.nativeEvent.offsetX
  //   const y = e.nativeEvent.offsetY

  // }


  // function selectStore(e) {
  //   setDestination(e.target.id)
  //   axios.get(`https://laon.info/api/lions/route/${currentPosition ? currentPosition : "3-1"}/${e.target.id}`)
  //   .then((res) => {
  //     // AR 변수 지정해주는 함수
  //     setNaviGoal(naviGoal => {
  //       naviGoal = res.data.facilityName
  //       return naviGoal
  //     })

  //     // 길찾기 좌표 지정해주는 함수
  //   })
    
  // }

  function goAR() {
    window.location.href = `/ar/${naviGoal}.html`
  }

  
  // const [floorIdx, setFloorIdx] = useState(0);
  // 함수에 인자로 넘겨주는 식으로 하기

  useEffect(() => {
    let naviCanvas = naviCanvasRef.current;
    naviCanvas.width = 412;
    naviCanvas.height = 461;
    let ctx = naviCanvas.getContext("2d")

    let wayArray = [];
    function calcWaypoints(vertices){
      var waypoints=[];
      for(var i=1;i<Object.keys(vertices).length;i++){

        if(parseInt(vertices[i]['pointId']/100) !== parseInt(vertices[i-1]['pointId']/100)){
          wayArray.push(waypoints);
          var waypoints=[];
          continue
        }

        // console.log(i);
        var pt0=vertices[i-1];
        var pt1=vertices[i];
        var dx=pt1['x']-pt0['x'];
        var dy=pt1['y']-pt0['y'];
        

        for(var j=0;j<20;j++){
            var x=pt0.x+dx*j/20;
            var y=pt0.y+dy*j/20;
            waypoints.push({x:x,y:y});
        }

        if(i === Object.keys(vertices).length - 1){
          wayArray.push(waypoints);
        }
      }
      return(wayArray);
    }

    // var waypoints=[];
    // for(let i=1; i<Object.keys(pointDtoList).length;i++){
    //   // var points = calcWaypoints(pointDtoList);
      
    //   if(pointDtoList[i]['type'] === 'S'){
    //     calcWaypoints(pointDtoList, i)
    //     var t=1;
    //     animate();
    //     var waypoints=[];
    //   }
    // }
 
    
    // var points = calcWaypoints(pointDtoList);
    calcWaypoints(pointDtoList);

    
    // for(let j=0; j<wayArray.length; j++){
    //   var points = wayArray[j];
    //   console.log(points)
    //   var t=1;
    //   // ctx.clearRect(0, 0, naviCanvas.width, naviCanvas.height)

    //   animate();
    // }
    

    let j=0;
    let t=1;
    let points = wayArray[j];
    ctx.clearRect(0, 0, naviCanvas.width, naviCanvas.height)
    animate();

    function animate(){
      if(t<points.length-1){ requestAnimationFrame(animate); }
      ctx.beginPath();
      ctx.moveTo(points[t-1].x, points[t-1].y);
      ctx.lineTo(points[t].x, points[t].y);
      ctx.lineWidth = '10';
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#074CA1';
      ctx.stroke();
      t++;
    }

  },[])

  return (
    <div className='navigation-container font'>

      <div className='navigation-body'>
        <div className='navigation-route'>
          <img className='navigation-map-img' src={floor} alt=''/>
          <canvas className='navigation-canvas' ref={naviCanvasRef}></canvas>
        </div>

        <button className='to-ar-button' onClick={goAR}>AR</button>
      </div>
    </div>
  )
}
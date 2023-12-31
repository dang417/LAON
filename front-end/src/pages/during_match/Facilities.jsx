import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import EntireSectionMapImg from './img/sectionMap.png';
import map2F from './img/sectionMap_2F.png';
import map3F from './img/sectionMap_3F.png';
import map5F from './img/sectionMap_5F.png';
import KELLY from './img/facilities/켈리로고.png'
import KEELY_img from './img/food/kelly.png'
import JJAKTAE from './img/facilities/짝태시대 로고.png'
import JJAKTAE_img from './img/food/짝태시대.PNG'
import TTANG from './img/facilities/땅땅치킨로고.png'
import TTANG_img from './img/food/ddang.png'
import PAPA from './img/facilities/파파존스피자로고.png'
import PAPA_img from './img/food/papazohns.jpg'
import HAPPY from './img/facilities/해피치즈스마일로고.png'
import HAPPY_img from './img/food/happycheese.png'
import JOKSU from './img/facilities/족발슈퍼.png'
import JOKSU_img from './img/food/족발슈퍼.png'
import CU from './img/facilities/CU로고.png'
import CU_img from './img/food/cu.png'
import BUTTER from './img/facilities/버터우드로고.png'
import BUTTER_img from './img/food/wood.PNG'
import ALTONG from './img/facilities/알통닭강정로고.png'
import ALTON_img from './img/food/떡강정.jpg'
import HONG from './img/facilities/리얼키친더홍로고.png'
import HONG_img from './img/food/키친더홍임시.png'
import MANDU from './img/facilities/한만두로고.png'
import MANDU_img from './img/food/hanmando.jpg'
import YUBU from './img/facilities/대왕유부초밥로고.png'
import YUBU_img from './img/food/doje.jpg'
import KKOCHI from './img/facilities/전설꼬치로고.png'
import KKOCHI_img from './img/food/kkochi.jpg'
import REALPIG from './img/facilities/리얼피그로고.png'
import REALPIG_img from './img/food/realPig.jpg'
import OJIK from './img/facilities/ojik로고.png'
import OJIK_img from './img/food/5직떡볶이.jpg'

import female_logo from './img/facility/female-sign.png'
import male_logo from './img/facility/male-sign.png'
import disabled_female from './img/facility/disabled-female.png'
import bottom from './img/facility_bg_bottom.png'
import SL_logo from './img/logo.png'
import disabled_male from './img/facility/disabled-male.png'
import camera from './img/facility/camera.png'
import baby from './img/facility/baby-bottle.png'
import smoking from './img/facility/smoking.png'
import trash from './img/facility/trash-can.png'

import { BiSolidDownArrow } from 'react-icons/bi'
import { MdGpsFixed } from 'react-icons/md'

import axios from 'axios';
import './styles/Facilities.css';
import Wrapper from '../../components/AnimateWrapper';


export default function Facilities() {
  const naviCanvasRef = useRef(null);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [naviGoal, setNaviGoal] = useState('')
  const [currentPosition, setCurrentPosition] = useState('');
  const [floor, setFloor] = useState(map3F)
  const [category, setCategory] = useState('식음매장')
  const [focusedBody, setFocusedBody] = useState(false)
  const [currentFloor, setCurrentFloor] = useState('3F')
  const [view, setView] = useState(false);
  const navigate = useNavigate()

  function selectFloor(e) {
    if (e.target.innerText === '2F') {
      setFloor(map2F)
      setCurrentFloor('2F')
    }
    else if (e.target.innerText === '3F') {
      setFloor(map3F)
      setCurrentFloor('3F')
    }
    else if (e.target.innerText === '5F') {
      setFloor(map5F)
      setCurrentFloor('5F')
    }
    getGPS()
  }

  const onChangeDeparture = (e) => {
    setDeparture(e.target.value);
  }

  const onChangeDestination = (e) => {
    setDestination(e.target.value);
  }

  const getPosition = (position) => {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    const alt = position.coords.altitude
    setPosition(lat, lng)
    return alt
  }

  const setPosition = (lat, lng) => {
    if (currentFloor === '2F') {
      if (35.84157845414607 <= lat && lat <= 35.84183530928126 && 128.6806084931448 <= lng && lng <= 128.68125028657408) {
        setCurrentPosition('Food Street')
      } else if (35.84088727860394 <= lat && lat <= 35.84065138467286 && 128.682132476393 <= lng && lng <= 128.68267484669371) {
        setCurrentPosition('RF-3')
      } else if (35.84065138467286 <= lat && lat <= 35.841235745073256 && 128.68225004602883 <= lng && lng <= 128.68272064701438) {
        setCurrentPosition('RF-7')
      } else if (35.841235745073256 <= lat && lat <= 35.8417188936227 && 128.68209186069376 <= lng && lng <= 128.68272064701438) {
        setCurrentPosition('RF-10')
      } else if (35.841408326501735 <= lat && lat <= 35.84177084845157 && 128.6818359228813 <= lng && lng <= 128.68209186069376) {
        setCurrentPosition('LF-7')
      } else if (35.84145482233314 <= lat && lat <= 35.84186203939144 && 128.68125028657408 <= lng && lng <= 128.6818359228813) {
        setCurrentPosition('LF-3')
      } else {
        setCurrentPosition('3-1')
      }
    } else if (currentFloor === '3F') {
      if (35.84157845414607 <= lat && lat <= 35.84183530928126 && 128.6806084931448 <= lng && lng <= 128.68125028657408) {
        setCurrentPosition('3-9')
      } else if (35.841433997522735 <= lat && lat <= 35.84157845414607 && 128.6804671036832 <= lng && lng <= 128.6811114803539) {
        setCurrentPosition('3-7')
      } else if (35.841257004439704 <= lat && lat <= 35.84141262165993 && 128.6803969657282 <= lng && lng <= 128.68086784271355) {
        setCurrentPosition('3-5')
      } else if (35.84100052759342 <= lat && lat <= 35.841257004439704 && 128.68037218713292 <= lng && lng <= 128.68083103853695) {
        setCurrentPosition('3-2')
      } else if (35.8407297168639 <= lat && lat <= 35.84100052759342 && 128.6802447345874 <= lng && lng <= 128.6809808490198) {
        setCurrentPosition('T3-2')
      } else if (35.84040237812547 <= lat && lat <= 35.8407297168639 && 128.6802931653395 <= lng && lng <= 128.68102321286383) {
        setCurrentPosition('TC-2')
      } else if (35.840148084408014 <= lat && lat <= 35.84060048530589 && 128.6804344405443 <= lng && lng <= 128.68094754235815) {
        setCurrentPosition('T1-2')
      } else if (35.840056734027634 <= lat && lat <= 35.840148084408014 && 128.68094754235815 <= lng && lng <= 128.68164989674025) {
        setCurrentPosition('1-3')
      } else if (35.84009687202578 <= lat && lat <= 35.84065138467286 && 128.68164989674025 <= lng && lng <= 128.68232307201419) {
        setCurrentPosition('1-8')
      } else {
        setCurrentPosition('3-1')
      }
    } else if (currentFloor === '5F') {
      if (35.84157845414607 <= lat && lat <= 35.84183530928126 && 128.6806084931448 <= lng && lng <= 128.68125028657408) {
        setCurrentPosition('U-29')
      } else if (35.841433997522735 <= lat && lat <= 35.84157845414607 && 128.6804671036832 <= lng && lng <= 128.6811114803539) {
        setCurrentPosition('U-26')
      } else if (35.841257004439704 <= lat && lat <= 35.84141262165993 && 128.6803969657282 <= lng && lng <= 128.68086784271355) {
        setCurrentPosition('U-23')
      } else if (35.84100052759342 <= lat && lat <= 35.841257004439704 && 128.68037218713292 <= lng && lng <= 128.68083103853695) {
        setCurrentPosition('U-21')
      } else if (35.8407297168639 <= lat && lat <= 35.84100052759342 && 128.6802447345874 <= lng && lng <= 128.6809808490198) {
        setCurrentPosition('U-16')
      } else if (35.84040237812547 <= lat && lat <= 35.8407297168639 && 128.6802931653395 <= lng && lng <= 128.68102321286383) {
        setCurrentPosition('U-13')
      } else if (35.840148084408014 <= lat && lat <= 35.84060048530589 && 128.6804344405443 <= lng && lng <= 128.68094754235815) {
        setCurrentPosition('U-7')
      } else if (35.840056734027634 <= lat && lat <= 35.840148084408014 && 128.68094754235815 <= lng && lng <= 128.68164989674025) {
        setCurrentPosition('U-3')
      } else {
        setCurrentPosition('3-1')
      }
    }
  }

  function categorySelect(e) {
    setCategory(e.target.innerText)
  }

  function selectStore(e) {
    setDestination(e.target.id)
    axios.get(`http://localhost:8080/api/lions/route/${currentPosition ? currentPosition : "U-21"}/${e.target.id}`)
      .then((res) => {
        // AR 변수 지정해주는 함수
        setNaviGoal(naviGoal => {
          naviGoal = res.data.facilityName
          goDetail(naviGoal, e.target.src, e.target.id)
          return naviGoal
        })
      })
  }

  function goDetail(naviGoal, facilityImg) {

    axios.get('http://localhost:8080/api/lions/facility/all')
      .then((res) => {
        const facilityId = res.data.facilityList.find(e => e.facilityName === naviGoal).facilityId

        navigate('/facilities/detail/', {
          state: {
            facilityId,
            naviGoal,
            facilityImg,
            currentPosition,
            currentFloor
          }
        })
      })
  }

  function selectStoreDetail(e) {
    // 식음매장 -> 매장 디테일,navi,ar 
    const destination = e.target.id
    const departure = currentPosition

    axios.get(`http://localhost:8080/api/lions/route/${currentPosition ? currentPosition : "U-21"}/${destination}`)
      .then((res) => {
        const naviGoal = res.data.facilityName // KELLLY(1-7)

        axios.get('http://localhost:8080/api/lions/facility/all')
          .then((res) => {
            const facilityId = res.data.facilityList.find(e => e.facilityName === naviGoal).facilityId

            navigate('/facilities/detail/', {
              state: {
                naviGoal,
                departure,
                destination,
                currentFloor,
                facilityId
              }
            })
          })
      })
  }

  function selectFacilityNavi(e) {
    // 편의시설 길찾기 보내는 함수
    const destination = e.target.id
    const departure = currentPosition

    navigate('/navigation', {
      state: {
        departure,
        currentFloor,
        destination
      }
    })
  }

  function selectFacilityAr(e) {
    // 편의시설 AR 보내는 함수
    axios.get(`http://localhost:8080/api/lions/route/${currentPosition ? currentPosition : "U-21"}/${e.target.id}`)
      .then((res) => {
        const naviGoal = res.data.facilityName
        window.location.href = `/ar/${naviGoal}.html`
      })
  }

  function getGPS() {
    navigator.geolocation.getCurrentPosition(getPosition)
  }

  function dropdown() {
    setView(!view)
  }

  useEffect(() => {
    getGPS()
  }, [])

  return (
    <Wrapper>
      <div className='facilities-container font'>
        <div className='facilities-header'>

          <div className='floor-select-button'>
            <div className='current-location-container'>
              <div className='current-location' onClick={getGPS}>
                <MdGpsFixed className='gps-icon' size={34} />
                <h2>{currentPosition} 구역</h2>
              </div>
              <div className='floor-dropdown' onClick={dropdown}>
                <span className='current-floor'>
                  {currentFloor}
                  <BiSolidDownArrow className='dropdown-icon' size={22} />
                </span>

                {view && <div className='dropdown-content'>
                  <button onClick={selectFloor} className='dropdown-item'>2F</button>
                  <button onClick={selectFloor} className='dropdown-item'>3F</button>
                  <button onClick={selectFloor} className='dropdown-item'>5F</button>
                </div>}
              </div>
            </div>
          </div>

          <div className='facilities-search-bar'>

          </div>

          <div className='category-select'>
            <button onClick={categorySelect} className={category === "식음매장" ? "category-button-line font" : "category-button-nonline font"}>식음매장</button>
            <button onClick={categorySelect} className={category === "편의시설" ? "category-button-line font" : "category-button-nonline font"}>편의시설</button>
          </div>
        </div>

        <div className='facilities-body'>

          <div className={`store-list ${category === "편의시설" ? "facility-hide" : ""}`}>
            <div
              className='facilities-store'
              id="KELLY"
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="KELLY" >
                <img className='store-img' src={KEELY_img} alt="" id="KELLY" />
                <div className='store-item-logo'>
                  <img className='store-logo-img' src={KELLY} alt="" id="KELLY" />
                </div>
              </div>
              <div className='store-item-body' id="KELLY" >
                <div className='store-title' id="KELLY" >
                  <span className='facility-store-title' id="KELLY" >KELLY</span>
                </div>
                <div className='store-itme-tag' id="KELLY" >
                  <span className='store-tag' id="KELLY" >#맥주</span>
                  <span className='store-tag' id="KELLY" >#KELLY</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="짝태시대">
                <img className='store-img' src={JJAKTAE_img} alt="" id="짝태시대" />
                <div className='store-item-logo'>
                  <img className='store-logo-img' id="짝태시대" src={JJAKTAE} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="짝태시대">
                <div className='store-title' id="짝태시대">
                  <span className='facility-store-title' id="짝태시대">짝태시대</span>
                </div>
                <div className='store-itme-tag'>
                  <span className='store-tag' id="짝태시대">#건어물</span>
                  <span className='store-tag' id="짝태시대">#먹태</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="리얼키친홍">
                <img className='store-img' src={HONG_img} alt="" id="리얼키친홍" />
                <div className='store-item-logo'>
                  <img className='store-logo-img' id="리얼키친홍" src={HONG} alt="" />
                </div>
              </div>
              <div className='store-item-body'>
                <div className='store-title' id="리얼키친홍">
                  <span className='facility-store-title' id="리얼키친홍">리얼키친홍</span>
                </div>
                <div className='store-itme-tag' id="리얼키친홍">
                  <span className='store-tag' id="리얼키친홍">#덮밥</span>
                  <span className='store-tag' id="리얼키친홍">#우동</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="파파존스피자">
                <img className='store-img' src={PAPA_img} alt="" id="파파존스피자" />
                <div className='store-item-logo' id="파파존스피자">
                  <img className='store-logo-img' id="파파존스피자" src={PAPA} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="파파존스피자">
                <div className='store-title' id="파파존스피자">
                  <span className='facility-store-title' id="파파존스피자">파파존스피자</span>
                </div>
                <div className='store-itme-tag' id="파파존스피자">
                  <span className='store-tag' id="파파존스피자">#피자</span>
                  <span className='store-tag' id="파파존스피자">#페퍼로니</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="CU">
                <img className='store-img' src={CU_img} alt="" id="CU" />
                <div className='store-item-logo' id="CU">
                  <img className='store-logo-img' id="CU" src={CU} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="CU">
                <div className='store-title' id="CU">
                  <span className='facility-store-title' id="CU">CU</span>
                </div>
                <div className='store-itme-tag' id="CU">
                  <span className='store-tag' id="CU">#편의점</span>
                  <span className='store-tag' id="CU">#얼음물</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="해피치즈스마일">
                <img className='store-img' src={HAPPY_img} alt="" id="해피치즈스마일" />
                <div className='store-item-logo' id="해피치즈스마일">
                  <img className='store-logo-img' id="해피치즈스마일" src={HAPPY} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="해피치즈스마일">
                <div className='store-title' id="해피치즈스마일">
                  <span className='facility-store-title' id="해피치즈스마일">해피치즈스마일</span>
                </div>
                <div className='store-itme-tag' id="해피치즈스마일">
                  <span className='store-tag' id="해피치즈스마일">#분식</span>
                  <span className='store-tag' id="해피치즈스마일">#소프트콘</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="땅땅치킨">
                <img className='store-img' src={TTANG_img} alt="" id="땅땅치킨" />
                <div className='store-item-logo' id="땅땅치킨">
                  <img className='store-logo-img' id="땅땅치킨" src={TTANG} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="땅땅치킨">
                <div className='store-title' id="땅땅치킨">
                  <span className='facility-store-title' id="땅땅치킨">땅땅치킨</span>
                </div>
                <div className='store-itme-tag' id="땅땅치킨">
                  <span className='store-tag' id="땅땅치킨">#치킨</span>
                  <span className='store-tag' id="땅땅치킨">#햄버거</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="대왕유부초밥">
                <img className='store-img' src={YUBU_img} alt="" id="대왕유부초밥" />
                <div className='store-item-logo' id="대왕유부초밥">
                  <img className='store-logo-img' id="대왕유부초밥" src={YUBU} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="대왕유부초밥">
                <div className='store-title' id="대왕유부초밥">
                  <span className='facility-store-title' id="대왕유부초밥">대왕유부초밥</span>
                </div>
                <div className='store-itme-tag' id="대왕유부초밥">
                  <span className='store-tag' id="대왕유부초밥">#유부초밥</span>
                  <span className='store-tag' id="대왕유부초밥">#어묵</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="전설꼬치">
                <img className='store-img' src={KKOCHI_img} alt="" id="전설꼬치" />
                <div className='store-item-logo' id="전설꼬치">
                  <img className='store-logo-img' id="전설꼬치" src={KKOCHI} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="전설꼬치">
                <div className='store-title' id="전설꼬치">
                  <span className='facility-store-title' id="전설꼬치">전설꼬치</span>
                </div>
                <div className='store-itme-tag' id="전설꼬치">
                  <span className='store-tag' id="전설꼬치">#꼬치</span>
                  <span className='store-tag' id="전설꼬치">#야끼도리</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="버터우드">
                <img className='store-img' src={BUTTER_img} alt="" id="버터우드" />
                <div className='store-item-logo' id="버터우드">
                  <img className='store-logo-img' id="버터우드" src={BUTTER} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="버터우드">
                <div className='store-title' id="버터우드">
                  <span className='facility-store-title' id="버터우드">버터우드</span>
                </div>
                <div className='store-itme-tag' id="버터우드">
                  <span className='store-tag' id="버터우드">#커피</span>
                  <span className='store-tag' id="버터우드">#베이커리</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="알통떡강정">
                <img className='store-img' src={ALTON_img} alt="" id="알통떡강정" />
                <div className='store-item-logo'>
                  <img className='store-logo-img' id="알통떡강정" src={ALTONG} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="알통떡강정">
                <div className='store-title'>
                  <span className='facility-store-title' id="알통떡강정">알통떡강정</span>
                </div>
                <div className='store-itme-tag'>
                  <span className='store-tag' id="알통떡강정">#닭강정</span>
                  <span className='store-tag' id="알통떡강정">#치킨</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="리얼피그">
                <img className='store-img' src={REALPIG_img} alt="" id="리얼피그" />
                <div className='store-item-logo' id="리얼피그">
                  <img className='store-logo-img' id="리얼피그" src={REALPIG} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="리얼피그">
                <div className='store-title' id="리얼피그">
                  <span className='facility-store-title' id="리얼피그">리얼피그</span>
                </div>
                <div className='store-itme-tag' id="리얼피그">
                  <span className='store-tag' id="리얼피그">#돼지</span>
                  <span className='store-tag' id="리얼피그">#후라이드</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="5직떡볶이">
                <img className='store-img' src={OJIK_img} alt="" id="5직떡볶이" />
                <div className='store-item-logo' id="5직떡볶이">
                  <img className='store-logo-img' id="5직떡볶이" src={OJIK} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="5직떡볶이">
                <div className='store-title' id="5직떡볶이">
                  <span className='facility-store-title' id="5직떡볶이">5직떡볶이</span>
                </div>
                <div className='store-itme-tag' id="5직떡볶이">
                  <span className='store-tag' id="5직떡볶이">#분식</span>
                  <span className='store-tag' id="5직떡볶이">#5직5재일</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="족발슈퍼">
                <img className='store-img' src={JOKSU_img} alt="" id="족발슈퍼" />
                <div className='store-item-logo' id="족발슈퍼">
                  <img className='store-logo-img' id="족발슈퍼" src={JOKSU} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="족발슈퍼">
                <div className='store-title' id="족발슈퍼">
                  <span className='facility-store-title' id="족발슈퍼">족발슈퍼</span>
                </div>
                <div className='store-itme-tag' id="족발슈퍼">
                  <span className='store-tag' id="족발슈퍼">#족발</span>
                  <span className='store-tag' id="족발슈퍼">#냉면</span>
                </div>
              </div>
            </div>
            <div
              className='facilities-store'
              onClick={selectStoreDetail}
            >
              <div className='store-item-header' id="한만두">
                <img className='store-img' src={MANDU_img} alt="" id="한만두" />
                <div className='store-item-logo' id="한만두">
                  <img className='store-logo-img' id="한만두" src={MANDU} alt="" />
                </div>
              </div>
              <div className='store-item-body' id="한만두">
                <div className='store-title' id="한만두">
                  <span className='facility-store-title' id="한만두">한만두</span>
                </div>
                <div className='store-itme-tag' id="한만두">
                  <span className='store-tag' id="한만두">#한만두</span>
                  <span className='store-tag' id="한만두">#왕만두</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`facility-list ${category === "식음매장" ? "facility-hide" : ""}`}>
            <div
              className='facilities-facility'
              id="여자화장실"
            >
              <div className='facility-toilet-scroll-body'>
                <div className='facility-icon-item'>
                  <img className='facility-icon' src={female_logo} alt="" />
                </div>
                <div className='facility-title-item'>
                  <span className='facility-title font'>여자 화장실</span>
                </div>
                <div className='facility-body'>
                  <button className='facility-body-button font' onClick={selectFacilityNavi} id="여자화장실">| 길찾기</button>
                </div>
              </div>
            </div>

            <div
              className='facilities-facility'
              id="남자화장실"
            >
              <div className='facility-toilet-scroll-body'>
                <div className='facility-icon-item'>
                  <img className='facility-icon' src={male_logo} alt="" />
                </div>
                <div className='facility-title-item'>
                  <span className='facility-title font'>남자 화장실</span>
                </div>
                <div className='facility-body'>
                  <button className='facility-body-button font' onClick={selectFacilityNavi} id="남자화장실">| 길찾기</button>
                </div>
              </div>
            </div>
            <div
              className='facilities-facility'
              id="여자장애인화장실"
            >
              <div className='facility-scroll-body'>
                <div className='facility-icon-item'>
                  <img className='facility-icon' src={disabled_female} alt="" />
                </div>
                <div className='facility-title-item'>
                  <span className='facility-title font'>여자 장애인 화장실</span>
                </div>
                <div className='facility-body'>
                  <button className='facility-body-button font' onClick={selectFacilityNavi} id="여자장애인화장실">| 길찾기</button>
                  <button className='facility-body-button font' onClick={selectFacilityAr} id="여자장애인화장실">AR</button>
                </div>
              </div>
            </div>
            <div
              className='facilities-facility'
              id="남자장애인화장실"
            >
              <div className='facility-scroll-body'>
                <div className='facility-icon-item'>
                  <img className='facility-icon' src={disabled_male} alt="" />
                </div>
                <div className='facility-title-item'>
                  <span className='facility-title font'>남자 장애인 화장실</span>
                </div>
                <div className='facility-body'>
                  <button className='facility-body-button font' onClick={selectFacilityNavi} id="남자장애인화장실">| 길찾기</button>
                  <button className='facility-body-button font' onClick={selectFacilityAr} id="남자장애인화장실">AR</button>
                </div>
              </div>
            </div>
            <div
              className='facilities-facility'
              id="블루샷"
            >
              <div className='facility-scroll-body'>
                <div className='facility-icon-item'>
                  <img className='facility-icon' src={camera} alt="" />
                </div>
                <div className='facility-title-item'>
                  <span className='facility-title font'>블루샷</span>
                </div>
                <div className='facility-body'>
                  <button className='facility-body-button font' onClick={selectFacilityNavi} id="블루샷">| 길찾기</button>
                  <button className='facility-body-button font' onClick={selectFacilityAr} id="블루샷">AR</button>
                </div>
              </div>
            </div>
            <div
              className='facilities-facility'
              id="수유실"
            >
              <div className='facility-scroll-body'>
                <div className='facility-icon-item'>
                  <img className='facility-icon' src={baby} alt="" />
                </div>
                <div className='facility-title-item'>
                  <span className='facility-title font'>수유실</span>
                </div>
                <div className='facility-body'>
                  <button className='facility-body-button font' onClick={selectFacilityNavi} id="수유실">| 길찾기</button>
                  <button className='facility-body-button font' onClick={selectFacilityAr} id="수유실">AR</button>
                </div>
              </div>
            </div>
            <div
              className='facilities-facility'
              id="흡연실"
            >
              <div className='facility-scroll-body'>
                <div className='facility-icon-item'>
                  <img className='facility-icon' src={smoking} alt="" />
                </div>
                <div className='facility-title-item'>
                  <span className='facility-title font'>흡연실</span>
                </div>
                <div className='facility-body'>
                  <button className='facility-body-button font' onClick={selectFacilityNavi} id="흡연실">| 길찾기</button>
                  <button className='facility-body-button font' onClick={selectFacilityAr} id="흡연실">AR</button>
                </div>
              </div>
            </div>
            <div
              className='facilities-facility'
              id="쓰레기통"
            >
              <div className='facility-scroll-body'>
                <div className='facility-icon-item'>
                  <img className='facility-icon' src={trash} alt="" />
                </div>
                <div className='facility-title-item'>
                  <span className='facility-title font'>쓰레기통</span>
                </div>
                <div className='facility-body'>
                  <button className='facility-body-button font' onClick={selectFacilityNavi} id="쓰레기통">| 길찾기</button>
                  <button className='facility-body-button font' onClick={selectFacilityAr} id="쓰레기통">AR</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Wrapper>
  )
}

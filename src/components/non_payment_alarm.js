import React from "react";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import firebaseExports from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
const {db} = firebaseExports;

const Alarm = ({ id }) => {
    const hasNotified = useRef(false);
    
  useEffect(() => {
    if (!id || hasNotified.current) return; // id가 없으면 실행 안 함

    const fetchUnpaidShops = async () => {
      try {
        const today = new Date();
        const currentMonth = today.getMonth() + 1 // 현재 월 (1~12)
        let missedMonths = [];
        const notify = () => toast(`${missedMonths.join(", ")} 수수료도 확인이 필요합니다.`);
        
        for (let month = currentMonth - 2; month >= 1; month--) { // (n-1)월부터 1월까지 조회
          const docRef = doc(db, "미입금", `${month}월`);
          const docSnap = await getDoc(docRef);
            
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data[id]) {
                missedMonths.push(`${month}월`)
                
            }
          }
        }if (missedMonths.length > 0) {
            notify();
            hasNotified.current = true;
            }
      } catch (error) {
        console.error("Firestore 데이터 조회 오류:", error);
      }
    };

    fetchUnpaidShops();
  }, []);

  return (
    <ToastContainer />
  );
};

export default Alarm;

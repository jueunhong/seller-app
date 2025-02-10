const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Firebase 서비스 계정 키 파일 경로
const serviceAccount = require('./serviceAccount.json');

// Firebase 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

// 절대경로로 data.json 파일 경로 지정
const dataFilePath = path.resolve(__dirname, 'jan_shop.json');

// JSON 파일 읽기
fs.readFile(dataFilePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  const jsonData = JSON.parse(data);

  // Firestore에 데이터 저장
  try {
    const collectionRef = firestore.collection('seller');  // 'seller' 컬렉션

    for (const item of jsonData) {
      const docId = item["id"];  // id를 문서 ID로 사용
      const docRef = collectionRef.doc(docId.toString());  // 문서 참조
      await docRef.set(item);  // 문서에 데이터 추가
      console.log(`Document with seller_id ${docId} added.`);
    }
  } catch (error) {
    console.error('Error uploading data to Firestore:', error);
  }
});

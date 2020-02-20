window.onload = function (e) {
    liff.init(function (data) {
        initializeApp(data);
    });
};
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBuzCbqzJQ9cjrfgM0N_TdsPEMxb16ZJpY",
    authDomain: "non-afxmct.firebaseapp.com",
    databaseURL: "https://non-afxmct.firebaseio.com",
    projectId: "non-afxmct",
    storageBucket: "non-afxmct.appspot.com",
    messagingSenderId: "52105346425",
    appId: "1:52105346425:web:d6a591fa94a3918aee83a8"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();



function initializeApp(data) {
    document.getElementById('languagefield').textContent = data.language;
    document.getElementById('viewtypefield').textContent = data.context.viewType;
    document.getElementById('useridfield').textContent = data.context.userId;
    document.getElementById('utouidfield').textContent = data.context.utouId;
    document.getElementById('roomidfield').textContent = data.context.roomId;
    document.getElementById('groupidfield').textContent = data.context.groupId;

    // openWindow call
    document.getElementById('openwindowbutton').addEventListener('click', function () {
        liff.openWindow({
            url: 'https://line.me'
        });
    });

    // closeWindow call
    document.getElementById('closewindowbutton').addEventListener('click', function () {
        liff.closeWindow();
    });

    // sendMessages call
    document.getElementById('sendmessagebutton').addEventListener('click', function () {
        liff.sendMessages([{
            type: 'text',
            text: "You've successfully sent a message! Hooray!"
        }, {
            type: 'sticker',
            packageId: '2',
            stickerId: '144'
        }]).then(function () {
            window.alert("Message sent");
        }).catch(function (error) {
            window.alert("Error sending message: " + error);
        });
    });

    // get access token
    document.getElementById('getaccesstoken').addEventListener('click', function () {
        const accessToken = liff.getAccessToken();
        document.getElementById('accesstokenfield').textContent = accessToken;
        toggleAccessToken();
    });

    // get profile call
    document.getElementById('getprofilebutton').addEventListener('click', function () {
        liff.getProfile().then(function (profile) {
            document.getElementById('useridprofilefield').textContent = profile.userId;
            document.getElementById('displaynamefield').textContent = profile.displayName;

            const profilePictureDiv = document.getElementById('profilepicturediv');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
            const img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = "Profile Picture";
            profilePictureDiv.appendChild(img);

            document.getElementById('statusmessagefield').textContent = profile.statusMessage;
            toggleProfileData();
        }).catch(function (error) {
            window.alert("Error getting profile: " + error);
        });
    });

    const userRef = db.doc('user');
    const fname = document.querySelector('fname');
    const lname = document.querySelector('lname');

    document.querySelector('register').addEventListener('click', function () {
        document.getElementById('useridfield').textContent = data.context.userId;
        const saveF = fname.value;
        const saveL = lname.value;
        console.log("ลงทะเบียน คุณ " + fname + lname );
        userRef.set({
            firstname: saveF,
            lastname: saveL
        }).then(function () {
            console.log("ลงทะเบียนเสร็จสิ้น");
        }).catch(function (error) {
            console.log("ลงทะเบียนไม่สำเร็จ", error);
        });
    });
}

function toggleAccessToken() {
    toggleElement('accesstokendata');
}

function toggleProfileData() {
    toggleElement('profileinfo');
}

function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = "none";
    } else {
        elem.style.display = "block";
    }
}

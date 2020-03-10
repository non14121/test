window.onload = function (e) {
    liff
        .init({
            liffId: "1653837424 - k4LmLDDJ"
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            console.log(err.code, err.message);
        });
};

const admin = require("firebase-admin");

//let serviceAccount = require("C:\Users\DELL\bot-bitch\firebase.login.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://non-afxmct.firebaseio.com"
});

const db = admin.firestore();

function initializeApp() {
    //document.getElementById('languagefield').textContent = data.language;
    //document.getElementById('viewtypefield').textContent = data.context.viewType;
    //document.getElementById('useridfield').textContent = data.context.userId;
    //document.getElementById('utouidfield').textContent = data.context.utouId;
    //document.getElementById('roomidfield').textContent = data.context.roomId;
    //document.getElementById('groupidfield').textContent = data.context.groupId;

    // openWindow call
    document.getElementById('openwindowbutton').addEventListener('click', function () {
        liff.openWindow({
            url: 'https://line.me',
            external: true
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


    document.querySelector('registerButton').addEventListener('click', function () {
        liff.getProfile().then(function (register) {
            var userId = register.userId;
            var saveF = document.querySelector('fname');
            var saveL = document.querySelector('lname');
            
            db.collection('user').doc(userId).set({ firstname: saveF, lastname: saveL });
        toggleRegister();
        })
            .then(function () {
            window.alert("ลงทะเบียนเสร็จสิ้น");
        })
            .catch(function (error) {
            window.alert("ลงทะเบียนไม่สำเร็จ" + error);
        });
    });
}

function toggleAccessToken() {
    toggleElement('accesstokendata');
}

function toggleProfileData() {
    toggleElement('profileinfo');
}

function toggleRegister() {
    toggleElement('register');
}

function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = "none";
    } else {
        elem.style.display = "block";
    }
}

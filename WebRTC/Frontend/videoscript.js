const baseurl = "http://localhost:8080";
// const socket = io(baseurl, { transports: ["websocket"] });

let localStream;
let remoteStream;
let peerConnection;

const localVidBox = document.getElementById("local-video");
const remoteVidBox = document.getElementById("remote-video");

async function call() {
  try {
    await fetchUserMedia();
    await createPeerConnection();
    // console.log("Creating offer...");
    const offer = await peerConnection.createOffer();
    // console.log(offer);
    peerConnection.setLocalDescription(offer);
    didIOffer = true;
    // socket.emit('newOffer',offer); //send offer to signalingServer
  } catch (error) {
    console.log(error);
  }
}

let peerConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
  ],
};

// let peerConfiguration = {
//   iceServers: [
//     { urls: "stun:stun1.l.google.com:19302" },
//     // { urls: "stun:stun.services.mozilla.com" },
//   ],
// };

const fetchUserMedia = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        // audio: true,
      });
      localVidBox.srcObject = stream;
      localStream = stream;
      resolve();
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};

const createPeerConnection = (offerObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      peerConnection = new RTCPeerConnection(peerConfiguration);
      // console.log(peerConnection);
      remoteStream = new MediaStream();
      remoteVidBox.srcObject = remoteStream;

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      peerConnection.addEventListener("signalingstatechange", (event) => {
        // console.log(event);
        // console.log(peerConnection.signalingState);
      });

      peerConnection.addEventListener("icecandidate", (e) => {
        // console.log("........Ice candidate found!......");
        if (e.candidate) {
          console.log(e.candidate);
          // socket.emit("sendIceCandidateToSignalingServer", {
          //   iceCandidate: e.candidate,
          //   iceUserName: userName,
          //   didIOffer,
          // });
        }
      });

      // peerConnection.onicecandidate = printices ;

      // function printices(e){
      //   console.log('Hello World') ;
      //   console.log(e.candidate) ;
      // }

      //   peerConnection.addEventListener("track", (e) => {
      //     console.log("Got a track from the other peer!! Now that's exciting");
      //     console.log(e);
      //     e.streams[0].getTracks().forEach((track) => {
      //       remoteStream.addTrack(track, remoteStream);
      //       console.log("Here's an exciting moment... fingers cross");
      //     });
      //   });

      if (offerObj) {
        //this won't be set when called from call();
        //will be set when we call from answerOffer()
        // console.log(peerConnection.signalingState) //should be stable because no setDesc has been run yet
        await peerConnection.setRemoteDescription(offerObj.offer);
        // console.log(peerConnection.signalingState) //should be have-remote-offer, because client2 has setRemoteDesc on the offer
      }
      resolve();
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};

call();

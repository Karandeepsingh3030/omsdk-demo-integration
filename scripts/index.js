// const OmidSessionClient = OmidSessionClient && OmidSessionClient['default'];
let sessionClient;
try {
  sessionClient = OmidSessionClient['default'];
} catch (e) { 
    console.log(e) 
}
if (!sessionClient) { 
    console.log("no session client")
}

const AdSession = sessionClient.AdSession;
const Partner = sessionClient.Partner;
const Context = sessionClient.Context;
const VerificationScriptResource = sessionClient.VerificationScriptResource;
const AdEvents = sessionClient.AdEvents;
const MediaEvents = sessionClient.MediaEvents

const CONTENT_URL = 'https://viewlift.com/';
const PARTNER_NAME = 'Viewlift';
const PARTNER_VERSION = '0.0.0';

const partner = new Partner(PARTNER_NAME, PARTNER_VERSION);

const OMSDK_SERVICE_WINDOW = window.top;
const VIDEO_ELEMENT = document.getElementById('video-creative-element');

//adding event listners
VIDEO_ELEMENT.addEventListener("loadeddata",(e)=> videoDidLoad(e))
// VIDEO_ELEMENT.addEventListener("timeupdate",(e)=> videoDidCrossQuartile())
// VIDEO_ELEMENT.addEventListener('click', () => {
//     // console.log(mediaEvents.adUserInteraction)
//     mediaEvents.adUserInteraction(InteractionType.CLICK);
//   });

{/* <AdVerifications>
<Verification vendor="verification.com-omid">
<JavaScriptResource apiFramework="omid" browserOptional="false">
<![CDATA[https://verification.com/omid_verification.js]]>
</JavaScriptResource>
<VerificationParameters><![CDATA[...]]></VerificationParameters>
</Verification>
</AdVerifications> */}

//verfication scripts
// const resources = ad.adVerifications.map((verification) => {
//   const scriptUrl = verification.javaScriptResource.cdata;
const scriptUrl = "https://appcmsstaging.viewlift.com/assets/omid_verification.js"
  const accessMode = 'full';
//   verification.vendor - optional
// verification.verificationParameters - optional
  const verificationScriptResource = new VerificationScriptResource(scriptUrl, accessMode);
// });

//context creation
const context = new Context(partner, [verificationScriptResource], CONTENT_URL);
context.setVideoElement(VIDEO_ELEMENT);
context.setServiceWindow(OMSDK_SERVICE_WINDOW);


// adsession
// function createAdSession() {
const adSession = new AdSession(context);
adSession.setCreativeType('video');

// See impression type documentation to determine which type you should use.
adSession.setImpressionType('beginToRender');

if (!adSession.isSupported()) {
  console.log(adSession.isSupported())
}

adSession.start();
// }
// //creating adsession
// createAdSession()


const adEvents = new AdEvents(adSession);
const mediaEvents = new MediaEvents(adSession);


function videoDidLoad() {
    // const isSkippable = ad.creative.linear.skipOffset != null;
    // const skipOffset = ad.creative.linear.skipOffset;
    const vastProperties = new VastProperties(isSkippable, skipOffset,
        /* isAutoPlay= */ true, /* position= */ 'preroll');
    adEvents.loaded(vastProperties);
}

function videoDidCrossQuartile() {
const lastVideoTime = -1
const currentVideoTime = VIDEO_ELEMENT.currentTime / VIDEO_ELEMENT.duration
if (lastVideoTime < 0 && currentVideoTime >= 0) {
    adEvents.impressionOccurred();
      mediaEvents.start(ad.creative.linear.duration, VIDEO_ELEMENT.volume);
  } else if (lastVideoTime < 0.25 && currentVideoTime >= 0.25) {
    mediaEvents.firstQuartile();
  } else if (lastVideoTime < 0.5 && currentVideoTime >= 0.5) {
    mediaEvents.midpoint();
  } else if (lastVideoTime < 0.75 && currentVideoTime >= 0.75) {
    this.mediaEvents_.thirdQuartile();
  } else if (lastVideoTime < 1 && currentVideoTime >= 1) {
    mediaEvents.complete();
    // Wait 3s, then finish the session.
    setTimeout(() => {
        adSession.finish();
    }, 3000);
  }

  lastVideoTime = currentVideoTime;
}

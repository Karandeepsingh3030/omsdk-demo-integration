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


// const fetchAdTagData = async () => {
//   let adTagUrl = "https://pubads.g.doubleclick.net/gampad/live/ads?sz=5x1000&iu=/5678/mg.kron/kronon/livestream/website&vpos=preroll&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&pmnd=0&pmxd=30000&pmad=1&url=https%3A%2F%2Fkronon.tv&description_url=https%3A%2F%2Fkronon.tv&correlator=[timestamp]&msid=&an=KronOn&rdid=[UUID]&idtype=&islat=0&pp=Nexstar&sid=[SESSION_ID]&vpmute=0&vpa=auto&wta=1&paln=AQzzBGQE8SbLcvvlDDIeVtFQq98sZdLWCeNu9proHNO7aoFiWVQG4NCQQJgUhSLmSGu8RwRDUa0aR27tYBE9wGYKx0cObWbWi6RuC6QpezY7RT5qV9wQovaxUyyHUohKeuIvllSNYLk8OoeJVgAw12e6WNl7B7q1ZEUVY0bapgPOYcHd8Cd_unPLwkSlg2u5hrCMRC3qxcvZGhv2bPmv0_gCGrtQFOqracuGX1YKcEuS_rXir3dUPNmVH61RXy2ulc1HFJlO0RNX8Bg-8wI1FS0M4chj5I_WK-DL9OzQ_AupV4d2dzMlZHTl0DgqBTx4NjbQgIhGwaab4p6BNw-0dMoqSpFJtfZU3QiRP6gsSTkxI7fqYIlqDi5j09FdCvr4yBJN7gEQNIVbbtjQudJI2-_zT_xF6RJqq834oxz4tfyW1Q4Wd6ci2KiqeH5SIsnfkdCxDSziI3bkEwfQRxj2qmQgimxV2MDis32_GBqG0StSKRUpp6lT5SvEpls6xBV8gdjLNM66S4Sw0qqPpFnDJz0rApAmFuAYGRYa0zh7ulY0rDpKmVkLwGlbtIB_dr_rbJFrNWvMp0EOER4b51xpGFSJ4aqAOo_NeZ4ocfdLrXqokKgdpueF5aw0SGwIXCp4r9WYiB2jLC8Ppgnx0y8AFMWtslH6ker4lAqW_gEz2V1Y74603wN3dGqcIMJnRnrTWdp47vXZwa_dGOQ-3g5uh8BkJOmDM8wuKxR_VjVClIkV8_oHczzkNGlwdfRKTBtyVfYFtmmkz_oPXUjZLOvRSQwALKNO_4AjOcfa9KiTHL2ZECdNaZthTzKHB0u9RHwCb1IJ5F_o9zqaKPZ0Wh4wzxU2WN7tNLEDRrVlRlx5lCbl4ewiDrtkWCSnELd9Wy7oGEl51G8632ZAwx-A1yTpguGZ9MXotNBBKFLYODKlmwSbDPAjz-ARLBJ_MVKw3_gCHgjtnumczZCfKG9NqlPDIohcSNd_YSlf_ABW5uoRnMIQCMSqufxXD5EuWAIVyke1gJ_E6Z1oernycdPPO6VODtSsWsMWKdzsBUbmQ7Dw9HctwsnzLWqs_pC-tWEMTcDwTVhUqacjAnDCvj_wNLvh4qvo_K3pCAlPXjlunUihbZp6ekMrX8j6bVrdH7fwKrljqZpG_Ksn7igAmNgx"
//     let response = await fetch(adTagUrl);
//     // let data = await response.text();
//     console.log(response);
// }
// fetchAdTagData()

//adding event listners
// VIDEO_ELEMENT.addEventListener("loadeddata",(e)=> videoDidLoad(e))
VIDEO_ELEMENT.addEventListener("timeupdate", (e) => videoDidCrossQuartile())
// VIDEO_ELEMENT.addEventListener('click', () => {
//     // console.log(mediaEvents.adUserInteraction)
//     mediaEvents.adUserInteraction(InteractionType.CLICK);
//   });
const adVerifications = [
  {
    executableResource: [],
    javaScriptResource: [
      {
        apiFramework: "omid",
        browserOptional: true,
        uri: "https://www.googletagservices.com/activeview/js/current/lidar_video_ssp.js"
      }
    ],
    trackingEvents: [
      {
        event: "verificationNotExecuted",
        uri: "https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_verification_rejected&errorcode=[REASON]"
      }
    ],
    vendor: "doubleclickbygoogle.com-ssp",
    verificationParameters: "{\"activeview_flags\":\"[\\\"x%278440'9efotm(&753374%2bejvf/%27844>'9wuvb$&56533>!=|vqc)!273794&<qqvb/%<1735020!=nehu`/!364=5051!9abk{a($160210:3&<cbotf+*0150034:%2bejvf/%72;17613!=efdwa*'76463;21$?ebkpb$&0366717>*>bgipf+!3=712363%9aihwc)!7202<217'9efotm(&20061;48&>`dopb/%<1707200!=8(&2005575?&>`dopb/%<170642?!=|vqc)!7201;=50'9wuvbu\\\"]\",\"activeview_metadata\":\"la=0&sloi=1&mm=v&\",\"tracking_configuration\":{\"tracking_events\":{\"abandon\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_video_abandon&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"complete\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_video_playtime_100&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"creativeview\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_vast_creative_view&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"exitfullscreen\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_vast_exit_fullscreen&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"firstquartile\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_video_playtime_25&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"fullscreen\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_fullscreen&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"fully_viewable_audible_half_duration_impression\":[\"https://pagead2.googlesyndication.com/pcs/activeview?xai=AKAOjssrH_MXR1X_GQmvonwhktRtoeAt4haCWE6wda7nb8i64ttrqJkfliP3R5BsUsns17orq_qk_ffvTjHek1Ja8FTj1fl55L1_IINOspwtJZexNG5DL5ZoaFZaVJO-FGRxt2WEqfNWSH018DdCBLNHIkaccHnCh4IG8rubJOECv45_be6qSjpjUoeW7tRljlgUx4EtGHyB2faL0NQE0fiyHZyELid6MkX8_8SGl_pqXU-nAipiW-Y1FVIOGVYchJ4sgiivf705OrKYrwjgJXc9UetLAklXIL5eaFIKCEFbliULM1q4drHGH_XR2uToHWR6EHt5HCY025kzPbXlL5Nt6QroKnxojj1vrS-hXf8R0vI-F1_BTzRMjwA2X-ZAIz0&sai=AMfl-YTRz45viGaksJRCtg0DIleRwVm5-LTbjhdxlYHNMZWlmqfD9SRzJhc1Yst1yb-rzSWgsA6MOrg1vqYHugRIoCjqNYxq-bzBFi24II66zTNa_bz-EHqyho1xqVUOzw_xjRJR&sig=Cg0ArKJSzDOk82oMF8YGEAE&id=lidarv&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]&avgm=1\"],\"measurable_impression\":[\"https://pagead2.googlesyndication.com/pcs/activeview?xai=AKAOjssrH_MXR1X_GQmvonwhktRtoeAt4haCWE6wda7nb8i64ttrqJkfliP3R5BsUsns17orq_qk_ffvTjHek1Ja8FTj1fl55L1_IINOspwtJZexNG5DL5ZoaFZaVJO-FGRxt2WEqfNWSH018DdCBLNHIkaccHnCh4IG8rubJOECv45_be6qSjpjUoeW7tRljlgUx4EtGHyB2faL0NQE0fiyHZyELid6MkX8_8SGl_pqXU-nAipiW-Y1FVIOGVYchJ4sgiivf705OrKYrwjgJXc9UetLAklXIL5eaFIKCEFbliULM1q4drHGH_XR2uToHWR6EHt5HCY025kzPbXlL5Nt6QroKnxojj1vrS-hXf8R0vI-F1_BTzRMjwA2X-ZAIz0&sai=AMfl-YTRz45viGaksJRCtg0DIleRwVm5-LTbjhdxlYHNMZWlmqfD9SRzJhc1Yst1yb-rzSWgsA6MOrg1vqYHugRIoCjqNYxq-bzBFi24II66zTNa_bz-EHqyho1xqVUOzw_xjRJR&sig=Cg0ArKJSzDOk82oMF8YGEAE&id=lidarv&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]&avm=1\"],\"midpoint\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_video_playtime_50&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"mute\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_mute&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"pause\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_pause&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"resume\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_resume&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"skipped\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_video_skipped&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"start\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_start&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"thirdquartile\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_video_playtime_75&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"unmute\":[\"https://pubads.g.doubleclick.net/pagead/live/interaction/?ai=Bp3Y3XKtzYvrVFYqohAX-3bSIAqjH-5pGAAAAEAEgttChKzgBWJPN0cODBGDlsuWDrA6yASdzdGFnaW5nLWhvaWNob2l0di52aWV3bGlmdC5jb211bmRlZmluZWS6AQo1eDEwMDBfeG1syAEF2gEvaHR0cDovL3N0YWdpbmctaG9pY2hvaXR2LnZpZXdsaWZ0LmNvbXVuZGVmaW5lZC-YAph1wAIC4AIA6gInLzU2NzgvbWcua3Jvbi9rcm9ub24vbGl2ZXN0cmVhbS93ZWJzaXRl-AKB0h6QA5oImAPgA6gDAeAEAdIFBhCqhcWWFpAGAaAGI6gH89EbqAeW2BuoB6qbsQKoB_-esQKoB9-fsQLYBwHgBw_SCAcIgGEQARhd2AgCgAoFmAsB0BUB-BYBgBcB&sigh=qu4NS0HVBtw&label=active_view_unmute&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\"],\"viewable_impression\":[\"https://pagead2.googlesyndication.com/pcs/activeview?xai=AKAOjssrH_MXR1X_GQmvonwhktRtoeAt4haCWE6wda7nb8i64ttrqJkfliP3R5BsUsns17orq_qk_ffvTjHek1Ja8FTj1fl55L1_IINOspwtJZexNG5DL5ZoaFZaVJO-FGRxt2WEqfNWSH018DdCBLNHIkaccHnCh4IG8rubJOECv45_be6qSjpjUoeW7tRljlgUx4EtGHyB2faL0NQE0fiyHZyELid6MkX8_8SGl_pqXU-nAipiW-Y1FVIOGVYchJ4sgiivf705OrKYrwjgJXc9UetLAklXIL5eaFIKCEFbliULM1q4drHGH_XR2uToHWR6EHt5HCY025kzPbXlL5Nt6QroKnxojj1vrS-hXf8R0vI-F1_BTzRMjwA2X-ZAIz0&sai=AMfl-YTRz45viGaksJRCtg0DIleRwVm5-LTbjhdxlYHNMZWlmqfD9SRzJhc1Yst1yb-rzSWgsA6MOrg1vqYHugRIoCjqNYxq-bzBFi24II66zTNa_bz-EHqyho1xqVUOzw_xjRJR&sig=Cg0ArKJSzDOk82oMF8YGEAE&id=lidarv&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]\",\"\"]}}}"
  }
]

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
// const scriptUrl = "https://www.googletagservices.com/activeview/js/current/lidar_video_ssp.js";
const scriptUrl = "https://appcmsstaging.viewlift.com/assets/omid_verification.js"
const accessMode = 'full';
//   verification.vendor - optional
// verification.verificationParameters - optional
// console.log("adData",adVerifications[0].verificationParameters)
const VENDOR_KEY = 'doubleclickbygoogle.com-ssp'; // you must use this value as is
// const PARAMS = JSON.stringify({ 'k': 'v' });
const verificationScriptResource = new VerificationScriptResource(scriptUrl, VENDOR_KEY,
  adVerifications[0].verificationParameters, accessMode);
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
  const vastProperties = new omid.common.VastProperties(false, 0,
        /* isAutoPlay= */ true, /* position= */ 'preroll');
  adEvents.loaded(vastProperties);
}

function videoDidCrossQuartile() {
  var lastVideoTime = -1
  var currentVideoTime = VIDEO_ELEMENT.currentTime / VIDEO_ELEMENT.duration
  if (lastVideoTime < 0 && currentVideoTime >= 0) {
    adEvents.impressionOccurred();
    //   mediaEvents.start(ad.creative.linear.duration, VIDEO_ELEMENT.volume);
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

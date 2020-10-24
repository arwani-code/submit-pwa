// let webPush = require('web-push');
 
// const vapidKeys = {
//    "publicKey": "BBIGDzGwDsDKDlH2ZYgIvW-0IQ0qBpa6ZXevYhieycYNq0RfgUdJkALflk8Lkud_JkzgTmXPcTkB9CcE8mhuPSw",
//    "privateKey": "z1bql_0nMtRkPHBMaOsoj0c0uODTGC5VlqAnBDCP9D8"
// };
 
 
// webPush.setVapidDetails(
//    'mailto:example@yourdomain.org',
//    vapidKeys.publicKey,
//    vapidKeys.privateKey
// )
// var pushSubscription = {
//    "endpoint": " https://fcm.googleapis.com/fcm/send/c7W04r83kK0:APA91bHWazZi22GJDR_KjBx_DJV5qlK1FEXk9XfuTMGwmXHKhIU3iVRdbtij4pvku9UzPOpB1F38wiMy8paEBbaFRg0UgA7kYevqx-RHCscebwpBsPEbdlSs3Pm0x2HpurWl7h6TrK1r",
//    "keys": {
//        "p256dh": "BOgh/TUTiw5ZtTUka1sLwVLV8PPtSwu+K9/utkezd8z3QtG8VZHMajMHM6zuoJBvSMN7JXGEjISZQ+ePYvY4+2Y=",
//        "auth": "LwBF4x357mvJGnaT90CAFQ=="
//    }
// };
// var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
// var options = {
//    gcmAPIKey: '452236278590',
//    TTL: 60
// };
// webPush.sendNotification(
//    pushSubscription,
//    payload,
//    options
// );

const webPush = require("web-push");

const vapidKeys = {
  publicKey: "BC8Bt4-Tti8a_d56kOC0G_VEQFMtjzI0GNRo_UBJfRpNFU1xQMp6Vn8Ybr-EA9_c1zzjwzRqyuB0tDPS35Lr3Cg",
  privateKey: "yYY8XHexEzfVLN4vKcp78SAeUJwmwhilEtmQh6lPORw",
};

webPush.setVapidDetails(
  "mailto:arwaniahmad659@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
const pushSubscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/f50J48ytnJE:APA91bFKMZ0W1xc96nNT796Zc_RbS8D0mJ9lwvL4ClrJK_ju3OF0Yi-QY-l4oDOZpSEdMRmtop0oTHAjHL2wTgNn_KciESUDoIe5fieAxW5I_c9vcL83Gdky5ms8zFcoASV4liHoiUXp",
  keys: {
    p256dh:
      "BGcaf0gJJ4dmnbJiTlKJi60zXj8rLD7AfbNHhl3Zf5DjoRFg7O/N5Q8t4i9RNlTsWToxc0GpXRzoRSjK06L9dgQ=",
    auth: "qwiLx1Q+gMKlkVqCqGMG5g==",
  },
};
const payload = "Notifikasi web push";

const options = {
  gcmAPIKey: '452236278590',
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
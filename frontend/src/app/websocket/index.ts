import { Client } from '@stomp/stompjs';

export const stomp = new Client({
    brokerURL: `ws://${window.location.host}/socket`,
    onConnect: () => {
        //stomp.subscribe('/user/37/message/send', msg => console.log(JSON.parse(msg.body)))
    }
});

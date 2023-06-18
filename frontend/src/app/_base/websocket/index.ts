import { Client } from '@stomp/stompjs';

export const stomp = new Client({ brokerURL: `ws://${window.location.host}/socket` });

class SensorValues {
  constructor() {
    this.dht11 = new Dht11();
    this.dht22 = new Dht22();
    this.mq2 = new Mq2();
    this.mq7 = new Mq7();
  }
}

class Dht11 {
  constructor(humidity, temperature) {
    this.humidity = humidity;
    this.temperature = temperature;
  }
}

class Dht22 {
  constructor(humidity, temperature) {
    this.humidity = humidity;
    this.temperature = temperature;
  }
}

class Mq2 {
  constructor(analog, co, lpg) {
    this.analog = analog;
    this.co = co;
    this.lpg = lpg;
  }
}

class Mq7 {
  constructor(analog, ppm) {
    this.analog = analog;
    this.ppm = ppm;
  }
}

export default SensorValues;

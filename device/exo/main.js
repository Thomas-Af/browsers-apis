const BLevel = document.getElementById("level");
const BCharging = document.getElementById("charging");
const BChargingTime = document.getElementById("chargingTime");
const BDischargingTime = document.getElementById("dischargingTime");

const DType = document.getElementById("type");
const DEType = document.getElementById("effectiveType");
const DDownlink = document.getElementById("downlink");
const DDownlinkMax = document.getElementById("downlinkMax");
const DSaveData = document.getElementById("saveData");

navigator.getBattery().then((battery) => {
  BLevel.innerHTML = `${battery.level * 100} %`;
  BCharging.innerHTML = `Device ${
    battery.charging ? "In Charge" : "Not in charge"
  }`;
  BChargingTime.innerHTML = `Time for charge: ${battery.chargingTime}`;
  BDischargingTime.innerHTML = `Time for discharge: ${battery.dischargingTime}`;

  battery.addEventListener("chargingchange", () => {
    BCharging.innerHTML = `Device ${
      battery.charging ? "In Charge" : "Not in charge"
    }`;
  });

  battery.addEventListener("levelchange", () => {
    BLevel.innerHTML = `${battery.level * 100} %`;
  });

  battery.addEventListener("chargingtimechange", () => {
    BChargingTime.innerHTML = `Time for charge: ${battery.chargingTime}`;
  });

  battery.addEventListener("dischargingtimechange", () => {
    BDischargingTime.innerHTML = `Time for discharge: ${battery.dischargingTime}`;
  });
});

const updateNetworkValues = (network) => {
  DType.innerHTML = network.type;
  DEType.innerHTML = network.effectiveType;
  DDownlink.innerHTML = `${network.downlink} Mbps`;
  DDownlinkMax.innerHTML = `${network.downlinkMax} Mbps`;
  DSaveData.innerHTML = network.saveData;
};

if ("connection" in navigator) {
  const network = navigator.connection;

  updateNetworkValues(network);

  network.addEventListener("change", () => {
    updateNetworkValues(network);
  });
} else {
  networkWrapper.innerHTML = "Network Information API not supported.";
}

const Memory = document.getElementById("memory");
Memory.innerHTML = `${navigator.deviceMemory} GB`;

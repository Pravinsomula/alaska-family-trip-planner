const routes = [
  {
    title: "Anchorage to Denali National Park and Preserve",
    distance: 240,
    kilometers: 386,
    time: "4 to 5 hours",
  },
  {
    title: "Denali to Fairbanks",
    distance: 125,
    kilometers: 201,
    time: "2 to 2.5 hours",
  },
  {
    title: "Fairbanks to Anchorage",
    distance: 360,
    kilometers: 580,
    time: "6 to 7 hours",
  },
  {
    title: "Anchorage to Seward",
    distance: 127,
    kilometers: 204,
    time: "2.5 to 3 hours",
  },
  {
    title: "Anchorage to Whittier",
    distance: 60,
    kilometers: 97,
    time: "1.5 hours",
  },
  {
    title: "Anchorage to Homer",
    distance: 220,
    kilometers: 354,
    time: "4.5 to 5 hours",
  },
];

const itinerary = [
  {
    day: "Days 1 to 2",
    title: "Arrive in Anchorage",
    note: "Ease into the trip with downtown walks, viewpoints, and a low-key first night after the Dallas flight.",
  },
  {
    day: "Days 3 to 4",
    title: "Drive to Denali",
    note: "Cover 240 scenic miles, then focus on wildlife tours, family hikes, and long-summer daylight.",
  },
  {
    day: "Day 5",
    title: "Continue to Fairbanks",
    note: "Add museums, riverboat time, or seasonal Northern Lights depending on when your family travels.",
  },
  {
    day: "Day 6",
    title: "Return to Anchorage",
    note: "Make the long 360-mile return drive, then rest before the coast segment.",
  },
  {
    day: "Days 7 to 8",
    title: "Finish in Seward",
    note: "Drive 127 miles south for Kenai Fjords cruising, glacier views, and whale watching.",
  },
];

const routeContainer = document.querySelector("#routes");
const timelineContainer = document.querySelector("#timeline");

function renderRoutes() {
  routeContainer.innerHTML = routes
    .map(
      (route) => `
        <article class="route-card">
          <div class="route-title">${route.title}</div>
          <div class="route-meta">
            <span>${route.distance} miles - ${route.kilometers} km</span>
            <strong>${route.time}</strong>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTimeline() {
  timelineContainer.innerHTML = itinerary
    .map(
      (stop) => `
        <article class="timeline-card">
          <span class="day">${stop.day}</span>
          <h3>${stop.title}</h3>
          <p>${stop.note}</p>
        </article>
      `
    )
    .join("");
}

const fields = {
  days: document.querySelector("#days"),
  travelers: document.querySelector("#travelers"),
  hotelTier: document.querySelector("#hotel-tier"),
  cruiseChoice: document.querySelector("#cruise-choice"),
  includeFairbanks: document.querySelector("#include-fairbanks"),
  includeHomer: document.querySelector("#include-homer"),
  daysValue: document.querySelector("#days-value"),
  travelersValue: document.querySelector("#travelers-value"),
  summaryTitle: document.querySelector("#summary-title"),
  driveMiles: document.querySelector("#drive-miles"),
  hotelNights: document.querySelector("#hotel-nights"),
  budgetTotal: document.querySelector("#budget-total"),
  tripFit: document.querySelector("#trip-fit"),
  summaryNote: document.querySelector("#summary-note"),
  driveRhythm: document.querySelector("#drive-rhythm"),
  travelerTip: document.querySelector("#traveler-tip"),
  guidanceTitle: document.querySelector("#guidance-title"),
  guidanceList: document.querySelector("#guidance-list"),
  mapModeLabel: document.querySelector("#map-mode-label"),
  routeFairbanks: document.querySelector("#route-fairbanks"),
  routeSeward: document.querySelector("#route-seward"),
  routeHomer: document.querySelector("#route-homer"),
  routeWhittier: document.querySelector("#route-whittier"),
  stopFairbanks: document.querySelector("#map-stop-fairbanks"),
  stopSeward: document.querySelector("#map-stop-seward"),
  stopHomer: document.querySelector("#map-stop-homer"),
  stopWhittier: document.querySelector("#map-stop-whittier"),
};

function setActiveState(node, active) {
  node.classList.toggle("active", active);
  node.classList.toggle("optional", !active);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function computeTrip() {
  const days = Number(fields.days.value);
  const travelers = Number(fields.travelers.value);
  const hotelNightly = Number(fields.hotelTier.value);
  const cruisePerPerson = Number(fields.cruiseChoice.value);
  const includeFairbanks = fields.includeFairbanks.checked;
  const includeHomer = fields.includeHomer.checked;

  let driveMiles = 240 + 127;
  let fit = "Easy scenic sampler";
  let note =
    "Anchorage, Denali, and Seward keep the scenery high and the driving moderate for a first Alaska trip.";
  let rhythm = "Northbound scenic climb with a shorter coastal finale.";
  let travelerTip =
    "Keep your first Anchorage day light so younger travelers can adjust before the Denali drive.";
  let guidanceTitle = "How this trip flows";
  let guidanceItems = [
    "Land in Anchorage and recover before the long scenic driving starts.",
    "Drive north to Denali for wildlife and mountain views before deciding on the longer interior loop.",
    "Finish south in Seward for the easiest glacier-cruise ending and a smoother trip home.",
  ];

  if (includeFairbanks) {
    driveMiles += 125 + 360;
    fit = "Balanced family adventure";
    note =
      "Denali, Fairbanks, and Seward give you the classic first-time Alaska mix: wildlife, long mountain drives, and a glacier cruise.";
    rhythm = "Long northbound days, easier coastal finish";
    travelerTip =
      "Plan a relaxed Anchorage evening after returning from Fairbanks before heading to Seward.";
    guidanceItems = [
      "Start in Anchorage, then drive north to Denali for the trip's big mountain section.",
      "Continue into Fairbanks only if your family is comfortable with one longer interior loop.",
      "Reset in Anchorage and then head to Seward for the clearest, least-stressful ending.",
    ];
  } else {
    driveMiles += 240;
    rhythm = "Moderate driving with more recovery time between scenic stops";
    travelerTip =
      "Skipping Fairbanks creates more room for slower mornings, extra hikes, or a Whittier cruise detour.";
  }

  if (includeHomer) {
    driveMiles = includeFairbanks ? 240 + 125 + 360 + 220 : 240 + 240 + 220;
    fit = "Long-drive peninsula version";
    note =
      "Homer adds a deeper Kenai Peninsula feel, but the drive is longer and the plan works best for families comfortable with bigger road days.";
    rhythm = "Interior loop first, then a longer peninsula push";
    travelerTip =
      "Choose Homer if your travelers enjoy road scenery more than cruise logistics and can handle a bigger final transfer.";
    guidanceTitle = "How the Homer swap changes things";
    guidanceItems = [
      "You still begin in Anchorage and usually keep Denali as the northern anchor.",
      "Homer replaces the simpler Seward finish with a longer peninsula drive and a more spread-out ending.",
      "This version works best for travelers who want quieter towns and don't mind extra windshield time.",
    ];
  }

  const whittierActive = !includeHomer && !includeFairbanks;
  const mapLabel = includeHomer
    ? "Homer peninsula variation"
    : includeFairbanks
      ? "Classic interior loop"
      : "Shorter family loop";

  const hotelNights = Math.max(days - 1, 6);
  const flightEstimate = travelers * 640;
  const hotelEstimate = hotelNights * hotelNightly;
  const rentalEstimate = days * 115;
  const gasEstimate = driveMiles * 0.22;
  const cruiseEstimate = travelers * cruisePerPerson;
  const foodEstimate = days * travelers * 38;
  const total = flightEstimate + hotelEstimate + rentalEstimate + gasEstimate + cruiseEstimate + foodEstimate;

  fields.daysValue.textContent = `${days} days`;
  fields.travelersValue.textContent = `${travelers} ${travelers === 1 ? "person" : "people"}`;
  fields.summaryTitle.textContent = `${days}-day family loop`;
  fields.driveMiles.textContent = `${Math.round(driveMiles)} miles`;
  fields.hotelNights.textContent = `${hotelNights} nights`;
  fields.budgetTotal.textContent = formatCurrency(total);
  fields.tripFit.textContent = fit;
  fields.summaryNote.textContent = note;
  fields.driveRhythm.textContent = rhythm;
  fields.travelerTip.textContent = travelerTip;
  fields.guidanceTitle.textContent = guidanceTitle;
  fields.guidanceList.innerHTML = guidanceItems.map((item) => `<li>${item}</li>`).join("");
  fields.mapModeLabel.textContent = mapLabel;

  setActiveState(fields.routeFairbanks, includeFairbanks);
  setActiveState(fields.stopFairbanks, includeFairbanks);
  setActiveState(fields.routeHomer, includeHomer);
  setActiveState(fields.stopHomer, includeHomer);
  setActiveState(fields.routeSeward, !includeHomer);
  setActiveState(fields.stopSeward, !includeHomer);
  setActiveState(fields.routeWhittier, whittierActive);
  setActiveState(fields.stopWhittier, whittierActive);
}

renderRoutes();
renderTimeline();
computeTrip();

document.querySelector("#planner-form").addEventListener("input", computeTrip);

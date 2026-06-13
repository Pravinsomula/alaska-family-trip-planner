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
};

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

  if (includeFairbanks) {
    driveMiles += 125 + 360;
    fit = "Balanced family adventure";
    note =
      "Denali, Fairbanks, and Seward give you the classic first-time Alaska mix: wildlife, long mountain drives, and a glacier cruise.";
  } else {
    driveMiles += 240;
  }

  if (includeHomer) {
    driveMiles = includeFairbanks ? 240 + 125 + 360 + 220 : 240 + 240 + 220;
    fit = "Long-drive peninsula version";
    note =
      "Homer adds a deeper Kenai Peninsula feel, but the drive is longer and the plan works best for families comfortable with bigger road days.";
  }

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
}

renderRoutes();
renderTimeline();
computeTrip();

document.querySelector("#planner-form").addEventListener("input", computeTrip);

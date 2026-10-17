This is the detailed story of bringing my family's Philco 46-1226 back to working order, from first opening the cabinet in July 2026 to the last crackle fixed in October. Each stage has a plain-English summary. If you want part numbers, measurements and test results, open the **Technical details** box under it.

The goal from day one: make the radio work again, safely and reliably, while changing as little of the original as possible.

<aside class="safety-note">
<strong>A word of caution.</strong> A radio like this runs at more than 400 volts inside, and its filter capacitors can hold a dangerous charge after it's unplugged. This page is a record of one restoration, not a how-to guide. If you're working on your own set, learn the safety basics first, and use a current-limited supply for first power-up.
</aside>

## 1. The starting point

The radio sat in the family for decades, with a power cord too far gone to plug in. When I opened the back, I found a chassis that was dusty and cobwebbed but remarkably intact. It was clean underneath, complete, and apparently never worked on. Even the original tube chart was still pasted inside the cabinet.

<div class="figure-row">
<figure>
<img src="/images/radio/dial-before.jpg" alt="The Philco dial and walnut cabinet before restoration, with the dial unlit" loading="lazy" />
<figcaption>Where it started: the dial in July 2026, dark for decades.</figcaption>
</figure>
<figure>
<img src="/images/radio/tube-chart.jpg" alt="The original Philco tube location chart pasted inside the cabinet" loading="lazy" />
<figcaption>The original tube chart, still inside the cabinet.</figcaption>
</figure>
</div>

<div class="figure-row">
<figure>
<img src="/images/radio/cabinet-back.jpg" alt="The open back of the console cabinet, showing the record changer above and the speaker below" loading="lazy" />
<figcaption>The cabinet with the back off: record changer on top, speaker below.</figcaption>
</figure>
<figure>
<img src="/images/radio/cobwebs.jpg" alt="Dusty wiring and cobwebs inside the cabinet" loading="lazy" />
<figcaption>Decades of dust and cobwebs.</figcaption>
</figure>
</div>

Before touching anything, I worked through the factory service manual and a few restoration threads on the [Philco Radio forum](https://www.philcoradio.com/phorum/) to pin down exactly which version of the chassis this was. The answer was stamped right on it.

<figure>
<img src="/images/radio/chassis-stamp.jpg" alt="The chassis stamped MODEL 46-1226-125 next to tubes marked with Philco's renewal reminder" loading="lazy" />
<figcaption>"Model 46-1226-125": the 46-1226, Code 125.</figcaption>
</figure>

<details>
<summary>Technical details</summary>

- **Model:** Philco 46-1226, Code 125, most likely the third production run. Evidence: the 7AF7 converter circuit, separate line-filter capacitors instead of an earlier combined unit, and the later 1,000 V value for C210.
- **Tubes:** 7AF7 converter, two 7H7 IF amplifiers, 7C6 detector and first audio, 6J5 phase inverter, two 6K6GT output tubes in push-pull, and a 5Y3GT rectifier. Factory permanent-magnet speaker.
- **References:** the 11-page Philco service manual, read in layers (Code 121, then the Code 122 changes, then Code 125), plus same-model restoration threads on the Philco Radio forum.
- **Working rules:**
  - Replace every electrolytic capacitor, and every paper capacitor that can be reached without risking the band switch, tuning assembly or dial drive.
  - Use safety-rated (Y2) capacitors from the power line to the chassis.
  - Test resistors, and replace only those out of tolerance or damaged.
  - Keep the mica and ceramic capacitors unless one is specifically implicated.
  - Keep original values and lead routing, and don't adopt forum modifications without measurements showing this chassis needs them.
- **Scope:** the radio only. The record changer is a separate project.

</details>

## 2. Out of the cabinet

The chassis came out in one piece. Underneath, it was full of the original wax-and-paper capacitors, the parts that fail most often in radios this old.

<div class="figure-row">
<figure>
<img src="/images/radio/chassis-out.jpg" alt="The radio chassis removed from the cabinet, top side, covered in dust" loading="lazy" />
<figcaption>The chassis, just out of the cabinet.</figcaption>
</figure>
<figure>
<img src="/images/radio/underside-before.jpg" alt="The underside of the chassis before restoration, with original brown and tan capacitors" loading="lazy" />
<figcaption>The underside before any work.</figcaption>
</figure>
</div>

## 3. Capacitors

Paper capacitors from the 1940s absorb moisture and start to leak current, which can overheat other parts or ruin the sound. Over a few sessions in late August and early September I replaced sixteen of them with modern film capacitors, one at a time, each on its original connection points. Two more are buried under the band switch and tuning assembly. Getting to them would mean disturbing parts that are working fine, so they stayed.

<div class="figure-row">
<figure>
<img src="/images/radio/old-paper-capacitor.jpg" alt="An original .05 microfarad, 400 volt paper capacitor held next to a small yellow modern film replacement" loading="lazy" />
<figcaption>An original .05 µF paper capacitor, and the much smaller modern film part that replaced it.</figcaption>
</figure>
<figure>
<img src="/images/radio/underside-after.jpg" alt="The chassis underside after restoration, with yellow film capacitors in place of the originals" loading="lazy" />
<figcaption>After: the yellow film capacitors are the new parts.</figcaption>
</figure>
</div>

<details>
<summary>Technical details</summary>

- **Replaced with 630 V film:** C202, C203, C206, C207, C208, C209, C305, C307, C308, C309, C310, one of C304/C306, and three accessible capacitors not yet matched to the schematic. Values were kept (.0068 µF for .006, .033 µF for .03, .047 µF for .05).
- **C210** (output-transformer protection, from plate to plate of the 6K6s) got a .0068 µF, 1,000 V film part. Philco changed this capacitor from .003 µF to .006 µF at 1,000 V during the run.
- **Left alone:** two paper capacitors (.006 µF and .01 µF) under the band switch and tuning assembly. Access would mean disturbing the tuned circuits and the dial drive. Nothing in later testing pointed to them.
- **Method:** one component at a time, photographed before removal, both endpoints traced against the schematic, and original cloth sleeving reused where a lead passed near other wiring.

</details>

## 4. The power supply

The power supply was the biggest single job. One of the large power resistors had failed completely, and another had drifted far out of tolerance. The filter capacitors, the big ones that smooth the high voltage, had to be replaced too. I wired the new capacitors onto new terminal strips and left the original metal cans mounted but disconnected, so the chassis still looks original from the top.

Partway through, I found that some connections had been cut before their replacements were fully in place. I stopped, photographed and labeled every loose end, and rebuilt it one connection at a time.

<div class="figure-row">
<figure>
<img src="/images/radio/failed-resistor.jpg" alt="The original Philco hollow power resistor, which measured open" loading="lazy" />
<figcaption>The original power resistor that had failed open.</figcaption>
</figure>
<figure>
<img src="/images/radio/filter-capacitors.jpg" alt="New black filter capacitors and white wirewound resistors on new terminal strips under the chassis" loading="lazy" />
<figcaption>New filter capacitors and resistors on new terminal strips.</figcaption>
</figure>
</div>

<details>
<summary>Technical details</summary>

- **R103** (1,300 Ω B+ dropping resistor, a hollow Philco power resistor) measured open. Replaced with a 1 kΩ and a 300 Ω wirewound resistor in series.
- **R100** (265 Ω bias resistor) measured 385 Ω. Replaced with 270 Ω on a new insulated tie point.
- **R101** (10 kΩ) measured about 9.8 kΩ, and **R102** (300 Ω) measured 298 Ω. Both kept.
- **C101** (originally 25 + 10 µF): replaced by 22 µF and 10 µF, 450 V, in parallel. Its negative side floats at the high-voltage center tap and returns to chassis through R100, so it must not be grounded.
- **C102** (25 µF B+ and 10 µF screen supply): replaced by 22 µF and 10 µF, 450 V, both returning to chassis.
- **Startup voltage:** from a cold start on wall power, C101 peaks around 480 V before the other tubes warm up and draw current, then settles around 340 V. A warm restart peaks around 350 V. The 480 V peak is a little above the new capacitors' 450 V rating. 600 V replacements are on hand, and for now the 450 V parts stay in service and get checked periodically for bulging or heat.

</details>

## 5. Power cord and line safety

Before any power-up, the parts that connect to the wall outlet had to be right. The power switch gave erratic readings until its contacts were cleaned. The original line-filter block, which connects the power line to the chassis, was replaced with modern safety-rated capacitors, and a new power cord went in.

<div class="figure-row">
<figure>
<img src="/images/radio/line-filter-old.jpg" alt="The original line filter block, crusted and discolored" loading="lazy" />
<figcaption>The original line-filter block.</figcaption>
</figure>
<figure>
<img src="/images/radio/line-filter-new.jpg" alt="Two small blue safety-rated capacitors mounted on a new three-lug terminal strip" loading="lazy" />
<figcaption>Its replacement: two Y2 safety capacitors on a new terminal strip.</figcaption>
</figure>
</div>

<details>
<summary>Technical details</summary>

- **Power switch (S100):** cold readings wandered between 0.5 and 2.9 kΩ, with occasional open readings. After DeoxIT D5 contact cleaner, they were steady.
- **C100A and C100B:** two .01 µF capacitors rated Y2, the class required between the power line and the chassis. An X2-rated part, meant for across the line, is not acceptable here.
- **New cord checks:** chassis ground at 0.0 Ω, both power leads open to chassis, and polarity correct.

</details>

## 6. First power, and the static

The first power-ups were slow and careful. First came a dim-bulb tester, which puts a light bulb in series with the radio to limit current if something is wrong. Then came a Variac, which raises the voltage gradually. The voltages looked right, but an intermittent static kept appearing.

Tracking it down took a day of swapping. Pulling tubes one at a time narrowed it to the output stage. Swapping the two 6K6 output tubes between their sockets settled it: the static followed one particular tube wherever it went. A replacement RCA 6K6GT arrived on September 18.

The next morning, Saturday, September 19, at 10:40, the radio played for the first time in decades. I tested it with a small low-power AM transmitter feeding it my own music. The first song through the speaker was Jimmy Eat World's "The Middle." Cleaning the antenna connections later that day made the broadcast stations come in much more clearly, and that night I started the station log.

<details>
<summary>Technical details</summary>

- **Equipment:** a dim-bulb tester (100 W bulb used throughout), then a Variac, with a Klein multimeter watching C101.
- **Early readings:** 6K6 bias about −8.2 to −8.7 V. C101 about 306 V on the bulb limiter.
- **Static isolation:** the static continued with the 6J5 removed. It came and went with the original transformer-side 6K6 ("tube A") in either socket, while the other original 6K6 stayed quiet for minutes at a time. Tube A was set aside and labeled.
- **Antenna:** the cabinet loop antenna measured 0.0 Ω end to end. Cleaning its hooks and screw terminals with D5 brought a big improvement in reception.
- **Band switch:** D5 applied with a small artist's brush to the reachable contacts after the radio briefly lost reception when the switch was moved.

</details>

## 7. Dial lights

The two lamps behind the dial glass were both dead. One was completely open, and the other measured 39,800 ohms, far from a working bulb. New #51 lamps had the dial glowing again by September 21.

<figure>
<img src="/images/radio/dial-lit.jpg" alt="The Philco dial lit with new lamps, glowing orange behind the glass" loading="lazy" />
<figcaption>The dial lit again for the first time in decades.</figcaption>
</figure>

<details>
<summary>Technical details</summary>

- **Dial lamps I101 and I102:** Philco part 34-2040, which is a #51 (7.5 V, 0.22 A, bayonet base). The two are wired in parallel, so one dead bulb doesn't darken the other.
- **Changer-compartment lamp:** a #55 on this production version. Deferred to the record changer project.

</details>

## 8. Alignment

With the radio playing, the dial was reading badly low. WHPY, a station on 1590, showed up near 1500, and WWVA on 1170 showed up around 1100. Aligning a radio means adjusting small trimmer screws so the circuits track the dial correctly.

My first attempt went wrong because I trusted my old signal generator at the top of the band. Its 1700 kHz setting turned out to be unreliable, and I'd set one adjustment against it. The fix was to use real stations as references instead. WHPY's frequency is known exactly, so I set the top of the dial to it, used the generator only where I'd confirmed it was accurate, and checked both ends. Afterward, stations landed where the glass said, within about 10 kHz.

<div class="figure-row">
<figure>
<img src="/images/radio/signal-generator.jpg" alt="A vintage Heathkit RF signal generator" loading="lazy" />
<figcaption>The signal generator, trusted only where I'd checked it.</figcaption>
</figure>
<figure>
<img src="/images/radio/trimmer-area.jpg" alt="The top of the chassis near the tuning section, with the antenna lead labeled" loading="lazy" />
<figcaption>The chassis top near the tuning section.</figcaption>
</figure>
</div>

<details>
<summary>Technical details</summary>

**Adjustments** (with the dial facing you):

| Trimmer | Location | Function | Adjusted |
|---|---|---|---|
| C402A | Front row, left | AM oscillator padder (low end, 580) | Yes |
| C402B | Front row, middle | AM oscillator trimmer (high end) | Yes |
| C402C | Front row, right | Shortwave oscillator | No* |
| C401A | Rear pair by the antenna leads, right | AM antenna trimmer (1500 peak) | Yes |
| C401I | Rear pair by the antenna leads, left | Shortwave antenna trimmer | No* |

\* On October 12, a shortwave screw was nudged so WWCR landed on 9.35 MHz. Which screw wasn't recorded.

**Procedure:** an IF pass first, peaked at an estimated 455 kHz. Then C402B was set so WHPY 1590 landed on a 1590 mark transferred from the glass to the backing plate. C401A was peaked at 1500. C402A was set so the generator at 580 (checked to within about 4 kHz on that band) landed on 580. Both ends were rechecked.

**Results**, read on the glass with the chassis back in the cabinet:

| Reference | Before | After |
|---|---|---|
| WHPY 1590 | ~1490–1500 | On 1590 |
| WPTF 680 | ~670 | ~670–675 |
| Low-power test transmitter, nominal 1000 | ~940 | ~990 |

**Lesson:** with an uncalibrated generator, use known broadcast stations to set the dial, and use the generator only for peaking and for spots where you've measured its error.

</details>

## 9. The last crackle

One noise remained: a popping, "crackling fire" sound, most obvious while tuning between stations. Rather than guess, I eliminated possibilities one at a time. Turning off the lights didn't change it. Turning the volume down silenced it, and disconnecting the antenna didn't, so it was coming from inside the radio. Pulling the 7AF7 converter tube stopped it completely, and tapping that tube with a wooden chopstick made it pop on every tap.

Pulling the stubborn 7AF7 also broke the thin fiber insulator under its socket's center sleeve. I made a temporary replacement until proper insulating paper arrived. A new-old-stock 7AF7 went in on October 8, and the crackle was gone. The new tube shifted the dial slightly, and a small touch-up on October 12 brought it back.

<figure>
<img src="/images/radio/7af7-socket.jpg" alt="The 7AF7 tube socket with its center sleeve lifted and the broken fiber insulator lying in three pieces beside it" loading="lazy" />
<figcaption>The 7AF7 socket, with its broken insulator in three pieces.</figcaption>
</figure>

<details>
<summary>Technical details</summary>

| Test | Result | Meaning |
|---|---|---|
| Room lights off | Crackle remained | Not household lighting |
| Volume fully down | No crackle | Noise enters before the volume control |
| Antenna disconnected | Crackle present | Generated inside the radio |
| 7AF7 removed | Silent at any volume or dial position | IF, detector and audio cleared; noise is in the converter stage |
| 7AF7 socket cleaned, tube reinstalled | Crackle back | Not socket contact alone |
| Chopstick tap on the 7AF7 | Loud burst every tap | Points to the tube itself |
| Same tap on both 7H7s | Nothing | The tap response is specific to the 7AF7 |

- **Also ruled out:** D5 on the band switch made it turn more easily but didn't change the crackle. D5 on the tuning capacitor didn't change it either, and the tuning capacitor's rotor already measured 0.0 Ω to chassis.
- **Socket insulator:** on a loktal socket, the fiber disc is clamped under the lip of the center locking sleeve. The tight tube pulled the sleeve up and released the disc, which crumbled. The plan is a new disc cut from fish paper, using the old tube's pins as a template.
- **Replacement tube:** a new-old-stock National Union 7AF7 that tested 86 on the seller's tube tester, where 70 or better is good. The original is labeled and kept.
- **After the swap:** WPTF read about 660 and WHPY about 1560–1570, so C402B got a small touch-up against WHPY.

</details>

## What's still open

- **The record changer:** a separate project for another day.
- **Shortwave:** never fully aligned. Two stations have been spot-checked and one adjusted to read correctly, but tracking across the band hasn't been verified.
- **The volume control:** it crackles at the bottom of its travel. It needs a cleaner that's safe for carbon tracks.
- **The band selector:** it still feels stiff in the AM position.
- **Cleaning:** the top of the chassis and the inside of the cabinet haven't been thoroughly cleaned yet.
- **Untested parts:** most of the original resistors haven't been measured. They'll only be tested if a symptom points to them.

## What I learned

- **Change one thing at a time.** Every fix was easier to trust because it was the only thing that changed.
- **Swap to prove it.** Moving a suspect tube to another socket, or pulling it, settled questions that measurements alone couldn't.
- **Use real stations as references.** An old signal generator can be off by a lot, and broadcast stations are on their exact frequencies.
- **Measure before borrowing fixes.** Forum threads are a great guide to what has gone wrong in other sets, but not to what's wrong in this one.
- **Keep the failed parts.** The bad 6K6 and 7AF7 are labeled and kept, both as a record and in case anything ever needs rechecking.

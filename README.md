# cappta-mars-exploration-v1

The source code of this project can be found on [https://github.com/marcoprado17/cappta-mars-exploration-v1](https://github.com/marcoprado17/cappta-mars-exploration-v1).

This project is my solution of cappta test ([https://gist.github.com/rmterra/31f2b4f589250839550f685d8873d935](https://gist.github.com/rmterra/31f2b4f589250839550f685d8873d935)).

The project solution is hosted on [https://cappta-mars-exploration-v1.web.app/](https://cappta-mars-exploration-v1.web.app/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Additional Considerations

* If the input is invalid or have an invalid character, an error message will be showed;
* If there is none probe, an error message will be showed;
* If a probe starts at an invalid position, an error message will be showed;
* If a probe starts in a point with a previous probe occupying the same place, the last probe moves will be ignored;
* In the simulation, is cosidered that a probe appears in the field after all moves of the previous probe.

## Local Setup

```sh
yarn install
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Run tests

```sh
yarn test
```

## Deployement

The project is hosted on firebase hosting.

```sh
yarn build
firebase deploy --only hosting
```

## Main classes created to solve the problem (located on package mars_exploration)

**MarsState**: Represents the state of mars field containing input information and the state (localization and direction) of each probe.

**ProbeState**: Represents the state of a probe, containing his localization and direction.

**InputInfo**: Represents the information contained in the input (field dimensions, probes initial positions, probes initial directions and probes commands).

**ProbeInfo**: Represents the information contained in the input of a specific probe (initial position, initial direction and commands).

**MarsSimulation**: Holds a reference to InputInfo and for an array of MarsState representing all states in the probes moving. It also contains a method to
add probes in the field and another method to process probe moves generating a new MarsState that will be added to his array of MarsState.

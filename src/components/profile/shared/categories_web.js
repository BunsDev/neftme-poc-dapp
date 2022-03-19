const cameraIcon = require('@assets/icons_web/camera.png');
const lockerIcon = require('@assets/icons_web/locker.png');
const tokenIcon = require('@assets/icons_web/token.png');
const clockIcon = require('@assets/icons_web/clock.png');

export default [
  {
    id: 'created',
    name: 'Created',
    icon: cameraIcon,
    width: 20,
    height: 18,
  },
  {
    id: 'owned',
    name: 'Owned',
    icon: lockerIcon,
    width: 20,
    height: 21,
  },
  {
    id: 'supporting',
    name: 'Supporting',
    icon: tokenIcon,
    width: 20,
    height: 20,
  },
  {
    id: 'activity',
    name: 'Activity',
    icon: clockIcon,
    width: 21,
    height: 18,
  },
];

timeNow = getTimer();
passedMsec = timeNow - prevTime;
fps = Math.round(1 / (passedMsec / 1000));
prevTime = timeNow;

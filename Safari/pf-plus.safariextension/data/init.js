safari.self.tab.dispatchMessage("getStorage", null);

function getStorageResult(msgEvent) {
    if (msgEvent.name === "getStorageResult") {
		applyPfPlus(msgEvent.message);
    }
}

safari.self.addEventListener("message", getStorageResult, false);
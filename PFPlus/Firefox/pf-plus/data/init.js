self.port.emit("getStorage");
self.port.on("getStorage", function(values) {
	applyPfPlus(values);
});
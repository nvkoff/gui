const gamePage = document.querySelector("#game-page");
const inventory = document.querySelector("#inventory");
const inventoryImage = document.querySelector(".inventory__image");
const inventoryFallback = document.querySelector(".inventory__fallback");
const centerMessage = document.querySelector("#center-message");
const resourceCount = document.querySelector("#resource-count");
const resourceNodes = [
    ...document.querySelectorAll(".resource-node")
];
const hotbarSlots = [
    ...document.querySelectorAll(".hotbar__slot")
];
let isInventoryOpen = false;
let collectedResources = 0;
let brightness = 1;
let messageTimeoutId = null;
if (inventoryImage && inventoryFallback) {
    inventoryImage.addEventListener("load", ()=>{
        inventoryFallback.style.display = "none";
    });
    inventoryImage.addEventListener("error", ()=>{
        inventoryImage.style.display = "none";
        inventoryFallback.style.display = "block";
    });
}
const updateBrightness = ()=>{
    gamePage.style.setProperty("--brightness-level", brightness.toFixed(2));
};
const toggleInventory = ()=>{
    isInventoryOpen = !isInventoryOpen;
    inventory.classList.toggle("is-open", isInventoryOpen);
    inventory.setAttribute("aria-hidden", String(!isInventoryOpen));
};
const showCenterMessage = ()=>{
    centerMessage.classList.add("is-visible");
    clearTimeout(messageTimeoutId);
    messageTimeoutId = setTimeout(()=>{
        centerMessage.classList.remove("is-visible");
    }, 1500);
};
const setActiveSlot = (slotNumber)=>{
    hotbarSlots.forEach((slot)=>{
        const isActive = Number(slot.dataset.slot) === slotNumber;
        slot.classList.toggle("is-active", isActive);
    });
};
resourceNodes.forEach((node)=>{
    node.addEventListener("click", ()=>{
        const alreadyCollected = node.classList.contains("is-collected");
        node.classList.toggle("is-collected");
        if (alreadyCollected) collectedResources = Math.max(0, collectedResources - 1);
        else collectedResources += 1;
        resourceCount.textContent = String(collectedResources);
    });
});
hotbarSlots.forEach((slot)=>{
    slot.addEventListener("click", ()=>{
        setActiveSlot(Number(slot.dataset.slot));
    });
});
document.addEventListener("keydown", (event)=>{
    if (event.code === "KeyE" || event.key === "e" || event.key === "E") {
        toggleInventory();
        return;
    }
    if (event.key === "Enter") {
        showCenterMessage();
        return;
    }
    if (event.key === "+" || event.key === "=") {
        brightness = Math.min(1.8, brightness + 0.1);
        updateBrightness();
        return;
    }
    if (event.key === "-" || event.key === "_") {
        brightness = Math.max(0.4, brightness - 0.1);
        updateBrightness();
        return;
    }
    if (/^[1-5]$/.test(event.key)) setActiveSlot(Number(event.key));
});
updateBrightness();

//# sourceMappingURL=gui.579125c3.js.map

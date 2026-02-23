// exercise4.js
const editList = document.querySelector("#edit-list");
editList.addEventListener("dblclick", function (event) {
  // 1. Find closest .edit-item from event.target; return if null
  const item = event.target.closest(".edit-item");
  if (!item) {
    return;
  }
  // 2. Return early if item already has .editing class
  if (item.classList.contains("editing")) {
    return;
  }
  // 3. Save original text, clear item, create and append input
  const originalText = item.textContent;
  item.textContent = "";
  const input = document.createElement("input");
  input.value = originalText;
  item.appendChild(input);
  item.classList.add("editing");
  input.focus();
  // -- Helper: commit the edit --
  let finished = false;
  function commitEdit() {
    if (finished) return;
    // If the edit has already been handled, exit early to prevent duplicate execution.

    finished = true;
    // Mark the edit as completed so commit or cancel cannot run again.
    // Pressing Enter triggers both the 'keydown' and 'blur' events.
    // This flag ensures the edit logic executes only once.
    const newText = input.value.trim() || originalText;
    // 4. Set item.textContent to newText, remove .editing
    item.textContent = newText;
    item.classList.remove("editing");
  }
  // -- Helper: cancel the edit --
  function cancelEdit() {
    if (finished) return;
    finished = true;
    // 5. Restore originalText, remove .editing
    item.textContent = originalText;
    item.classList.remove("editing");
  }
  // 6. Listen for 'keydown' on input
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Enter -> commitEdit()
      commitEdit();
    }
    if (event.key === "Escape") {
      // Escape -> cancelEdit()
      cancelEdit();
    }
  });
  // 7. Listen for 'blur' on input -> commitEdit()
  input.addEventListener("blur", commitEdit);
});

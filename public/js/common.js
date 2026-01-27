function toggleMultiSelect(displayEl) {
    console.log(displayEl,"displayEl");
      
    const container = displayEl.parentElement;
    const wasOpen = container.classList.contains('open');
    
    // Close all other dropdowns
    document.querySelectorAll('.multi-select.open').forEach(ms => {
        ms.classList.remove('open');
    });
    
    // Toggle this one
    if (!wasOpen) {
        container.classList.add('open');
    }
}
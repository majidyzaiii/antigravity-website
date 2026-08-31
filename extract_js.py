import re

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Extract the swipe script
swipe_script = ''
match = re.search(r'<script[^>]*>.*?swipeHandle.*?</script>', c, re.DOTALL)
if match:
    # the script contains a lot of things. We just need the swipe part!
    # Let's extract the swipe script logic specifically.
    full_script = match.group(0)
    
    # Let's see what it looks like
    print(full_script[:100])
    
    # Let's just inject the whole script block because it might have other useful stuff, or just extract the swipe part
    idx_swipe = full_script.find('// === SWIPE TO SUBMIT LOGIC ===')
    if idx_swipe != -1:
        end_swipe = full_script.find('// === END SWIPE LOGIC ===', idx_swipe)
        if end_swipe == -1:
            end_swipe = len(full_script) - 9 # before </script>
        swipe_logic = full_script[idx_swipe:end_swipe]
        
        with open('donation.html', 'r', encoding='utf-8') as f2:
            d = f2.read()
            
        new_script = '\n<script>\ndocument.addEventListener("DOMContentLoaded", () => {\n' + swipe_logic + '\n});\n</script>\n</body>'
        d = d.replace('</body>', new_script)
        
        with open('donation.html', 'w', encoding='utf-8') as f2:
            f2.write(d)
        print("Injected swipe logic")
    else:
        # Fallback to copy the whole script
        print("Could not find swipe comments")
        

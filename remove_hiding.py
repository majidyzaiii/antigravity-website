def clean_file(filename):
    with open(filename, "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    start_idx = -1
    for i, line in enumerate(lines):
        if "body.about-page header.main-header," in line:
            start_idx = i
            break
            
    if start_idx == -1:
        print(f"Not found in {filename}")
        return
        
    end_idx = -1
    for i in range(start_idx, min(start_idx + 20, len(lines))):
        if "display: none !important;" in lines[i] and "}" in lines[i]:
            # The second block ends with }
            end_idx = i
            break
            
    if end_idx != -1:
        del lines[start_idx:end_idx+1]
        with open(filename, "w", encoding="utf-8") as f:
            f.writelines(lines)
        print(f"Cleaned up {filename}")
    else:
        print(f"Could not find end of block in {filename}")

clean_file("about.html")
clean_file("updates.html")

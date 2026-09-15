with open("about.html", "r", encoding="utf-8") as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if "about-minimal-header" in line and "<div" in line:
            for j in range(i-5, i+10):
                if j >= 0 and j < len(lines):
                    print(f"Line {j}: {lines[j].strip()}")
            break

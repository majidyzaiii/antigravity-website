with open("about.html", "r", encoding="utf-8") as f:
    lines = f.readlines()
for i, l in enumerate(lines):
    if "html[lang=\"ur\"] header" in l and "{" in lines[i+2]:
        pass # just to find block
    if "flex-direction: column !important" in l:
        print(f"Found column at line {i}")
        for j in range(i-6, i+10):
            if 0 <= j < len(lines):
                print(lines[j].strip())
        break

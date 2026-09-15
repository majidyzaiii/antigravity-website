with open("about.html", "r", encoding="utf-8") as f:
    for line in f:
        if "id=\"ultimateScrollHeader\"" in line:
            print(line.strip())
            break

for f in ["about.html", "updates.html"]:
    print(f"\n--- {f} ---")
    with open(f, "r", encoding="utf-8") as file:
        lines = file.readlines()
        for i in range(20, 35):
            print(f"Line {i}: {lines[i].strip()}")

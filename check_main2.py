with open("updates.html", "r", encoding="utf-8") as f:
    html = f.read()

idx1 = html.find('class="about-minimal-header"')
idx2 = html.find('<footer')

if idx1 != -1 and idx2 != -1:
    with open("updates_out.txt", "w", encoding="utf-8") as f2:
        f2.write(html[idx1:idx2])

import re

def refactor_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    start_idx = html.find('<div class="categories-skills-grid" id="skills-container">')
    if start_idx == -1:
        print("Could not find start")
        return
    
    end_idx = start_idx
    open_divs = 0
    i = start_idx
    while i < len(html):
        if html[i:i+4] == '<div':
            open_divs += 1
            i += 4
        elif html[i:i+5] == '</div':
            open_divs -= 1
            i += 5
            if open_divs == 0:
                end_idx = i
                break
        else:
            i += 1

    old_grid = html[start_idx:end_idx]

    skill_cards = []
    
    articles = re.split(r'<article class="category-skill-card" data-category="([^"]+)">', old_grid)
    
    for i in range(1, len(articles), 2):
        category = articles[i]
        content = articles[i+1]
        
        card_splits = content.split('<div class="skill-spec-card">')
        for j in range(1, len(card_splits)):
            card_content = card_splits[j]
            
            top_match = re.search(r'<div class="skill-top">(.*?)</div>\s*<p class="skill-desc">', card_content, re.DOTALL)
            desc_match = re.search(r'<p class="skill-desc">(.*?)</p>', card_content, re.DOTALL)
            prog_match = re.search(r'<div class="skill-progress-wrap">(.*?)</div>\s*</div>', card_content, re.DOTALL)
            if not prog_match:
                prog_match = re.search(r'<div class="skill-progress-wrap">(.*?)</article>', card_content, re.DOTALL)
            
            if top_match and desc_match:
                top = top_match.group(1).strip()
                desc = desc_match.group(1).strip()
                
                # Extract progress manually or just with another split
                prog_start = card_content.find('<div class="skill-progress-wrap">')
                prog = ""
                if prog_start != -1:
                    # just extract everything after skill-progress-wrap till the end of its div
                    p_text = card_content[prog_start + len('<div class="skill-progress-wrap">'):]
                    # We know it contains skill-progress-meta and skill-progress-bar
                    prog_meta = re.search(r'<div class="skill-progress-meta">.*?</div>', p_text, re.DOTALL)
                    prog_bar = re.search(r'<div class="skill-progress-bar">.*?</div>\s*</div>', p_text, re.DOTALL)
                    if prog_meta and prog_bar:
                        prog = prog_meta.group(0) + "\n" + prog_bar.group(0)
                
                new_card = f"""
          <article class="interactive-skill-card skill-item" data-category="{category}" style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; flex: 1 1 280px; max-width: 400px; min-width: 250px; transition: all var(--transition-fast);">
            <div class="skill-header-click" tabindex="0" role="button" aria-expanded="false" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; cursor: pointer;">
              <div class="skill-top" style="margin-bottom:0; width: 100%; display: flex; align-items: center; justify-content: space-between;">
                {top}
                <svg class="skill-chevron icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 0.5rem; transition: transform 0.3s ease;"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <div class="skill-details-expand" hidden style="padding: 0 1rem 1rem 1rem; border-top: 1px dashed var(--color-border); margin-top: 0.5rem; padding-top: 1rem; animation: fadeInDown 0.3s ease;">
              <p class="skill-desc" style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 1rem;">{desc}</p>
              <div class="skill-progress-wrap">
                {prog}
              </div>
            </div>
          </article>"""
                skill_cards.append(new_card)

    new_grid = f'''<div class="interactive-skills-grid" id="skills-container" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
{"".join(skill_cards)}
        </div>'''
        
    new_html = html[:start_idx] + new_grid + html[end_idx:]
    with open('index_new.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Done generating index_new.html")

refactor_html()

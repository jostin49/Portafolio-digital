import re
import html

def escape_attr(s):
    return html.escape(s, quote=True)

def refactor_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    start_idx = html_content.find('<div class="categories-skills-grid" id="skills-container">')
    if start_idx == -1:
        print("Could not find start")
        return
    
    end_idx = start_idx
    open_divs = 0
    i = start_idx
    while i < len(html_content):
        if html_content[i:i+4] == '<div':
            open_divs += 1
            i += 4
        elif html_content[i:i+5] == '</div':
            open_divs -= 1
            i += 5
            if open_divs == 0:
                end_idx = i
                break
        else:
            i += 1

    old_grid = html_content[start_idx:end_idx]

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
            
            if top_match and desc_match:
                top = top_match.group(1).strip()
                desc = desc_match.group(1).strip()
                
                logo_match = re.search(r'<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>', top)
                logo_src = logo_match.group(1) if logo_match else ''
                
                name_match = re.search(r'<h5[^>]*>(.*?)</h5>', top)
                name = name_match.group(1).strip() if name_match else 'Skill'
                
                short_name_match = re.search(r'alt="([^"]+)"', top)
                short_name = short_name_match.group(1).strip() if short_name_match else name
                
                subcat_match = re.search(r'<span[^>]*color:\s*var\(--color-text-muted\)[^>]*>(.*?)</span>', top)
                subcategory = subcat_match.group(1).strip() if subcat_match else category.capitalize()
                
                badge_match = re.search(r'<span class="skill-badge (badge-[^"]+)">(.*?)</span>', top)
                badge_class = badge_match.group(1) if badge_match else 'badge-basico'
                badge_text = badge_match.group(2) if badge_match else ''
                
                prog_start = card_content.find('<div class="skill-progress-wrap">')
                prog_val = "0%"
                if prog_start != -1:
                    p_text = card_content[prog_start + len('<div class="skill-progress-wrap">'):]
                    val_match = re.search(r'<span>(\d+%)</span>', p_text)
                    if val_match:
                        prog_val = val_match.group(1)
                
                pill = f"""
          <button type="button" class="skill-pill-btn skill-item" 
                  data-category="{escape_attr(category)}"
                  data-name="{escape_attr(name)}"
                  data-subcat="{escape_attr(subcategory)}"
                  data-badge="{escape_attr(badge_text)}"
                  data-badge-class="{escape_attr(badge_class)}"
                  data-desc="{escape_attr(desc)}"
                  data-prog="{escape_attr(prog_val)}"
                  data-logo="{escape_attr(logo_src)}"
                  style="display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.55rem 1.15rem; background-color: var(--color-surface); border: 1.5px solid var(--color-border); border-radius: 12px; font-weight: 600; color: var(--color-text); box-shadow: var(--shadow-sm); transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast); cursor: pointer;"
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='var(--color-primary)'; this.style.boxShadow='var(--shadow-card-hover)';"
                  onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--color-border)'; this.style.boxShadow='var(--shadow-sm)';">
             <img src="{logo_src}" alt="{short_name}" class="skill-brand-icon" style="width:20px; height:20px; object-fit:contain;">
             <span>{short_name}</span>
          </button>"""
                skill_cards.append(pill)

    new_grid = f'''<div class="interactive-skills-grid" id="skills-container" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; align-items: center;">
{"".join(skill_cards)}
        </div>
        
        <!-- Skill Modal (Added by refactor) -->
        <div id="skill-detail-modal" class="modal-backdrop" hidden style="position: fixed; inset: 0; background-color: rgba(15, 23, 42, 0.75); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
          <div class="modal-content" style="background-color: var(--color-surface-card); border-radius: var(--radius-lg); border: 1px solid var(--color-border); max-width: 400px; width: 100%; box-shadow: var(--shadow-modal); overflow: hidden; transform: translateY(20px); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
            <div style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--color-border);">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="skill-spec-icon" style="background-color: var(--color-surface-hover); border-radius: var(--radius-sm); padding: 0.5rem; border: 1px solid var(--color-border);">
                  <img id="modal-skill-logo" src="" alt="" style="width: 24px; height: 24px; object-fit: contain;">
                </div>
                <div>
                  <h3 id="modal-skill-name" style="font-size: 1.25rem; font-weight: 800; color: var(--color-text); margin-bottom: 0.1rem;"></h3>
                  <span id="modal-skill-subcat" style="font-size: 0.8125rem; color: var(--color-text-muted);"></span>
                </div>
              </div>
              <button id="close-skill-modal" style="padding: 0.25rem; color: var(--color-text-muted); cursor: pointer;" aria-label="Cerrar modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span style="font-size: 0.875rem; font-weight: 600;">Nivel de Dominio</span>
                <span id="modal-skill-badge" class="skill-badge"></span>
              </div>
              <p id="modal-skill-desc" style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 1.5rem;"></p>
              
              <div class="skill-progress-wrap">
                <div class="skill-progress-meta" style="display: flex; justify-content: space-between; font-size: 0.8125rem; font-weight: 600; color: var(--color-text-muted); margin-bottom: 0.5rem;">
                  <span>Dominio</span>
                  <span id="modal-skill-prog-text"></span>
                </div>
                <div class="skill-progress-bar" style="width: 100%; height: 8px; background-color: var(--color-surface-hover); border-radius: var(--radius-full); overflow: hidden;">
                  <div id="modal-skill-prog-fill" style="height: 100%; background: linear-gradient(90deg, var(--color-primary), var(--color-secondary)); border-radius: var(--radius-full); width: 0%; transition: width 1s ease-out;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        '''
        
    new_html_content = html_content[:start_idx] + new_grid + html_content[end_idx:]
    with open('index_new.html', 'w', encoding='utf-8') as f:
        f.write(new_html_content)
    print("Done generating index_new.html")

refactor_html()

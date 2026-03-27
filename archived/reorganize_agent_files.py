import os
import re
import shutil

AGENT_DIR = r"e:\Asso-Rescape\.agent"
SKILLS_DIR = os.path.join(AGENT_DIR, "skills")
RULES_DIR = os.path.join(AGENT_DIR, "rules")
WORKFLOWS_DIR = os.path.join(AGENT_DIR, "workflows")

def extract_description(content):
    # Try to find the first paragraph or header that isn't empty
    lines = content.split('\n')
    for line in lines:
        stripped = line.strip()
        if stripped and not stripped.startswith('---') and not stripped.startswith('import '):
            # remove markdown characters like #, *, etc.
            clean = re.sub(r'^[#*\-=>\s]+', '', stripped)
            if len(clean) > 10:
                # Truncate to 200 chars and remove inner quotes that break YAML
                return clean[:200].replace('"', "'")
    return "Automated description generated for this item."

def process_skills():
    if not os.path.exists(SKILLS_DIR):
        print(f"Directory not found: {SKILLS_DIR}")
        return

    print("Processing Skills...")
    for item in os.listdir(SKILLS_DIR):
        item_path = os.path.join(SKILLS_DIR, item)
        if os.path.isdir(item_path):
            skill_md = os.path.join(item_path, "SKILL.md")
            if os.path.exists(skill_md):
                with open(skill_md, "r", encoding="utf-8") as f:
                    content = f.read()
                
                if not content.lstrip().startswith("---"):
                    desc = extract_description(content)
                    yaml_frontmatter = f"---\nname: {item}\ndescription: \"{desc}\"\n---\n"
                    new_content = yaml_frontmatter + content
                    
                    with open(skill_md, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"✔ Added frontmatter to skill: {item}")
                else:
                    # check if name and description are in the existing frontmatter
                    frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
                    if frontmatter_match:
                        fm = frontmatter_match.group(1)
                        needs_update = False
                        fm_lines = fm.split('\n')
                        if not any(l.startswith('name:') for l in fm_lines):
                            fm_lines.append(f"name: {item}")
                            needs_update = True
                        if not any(l.startswith('description:') for l in fm_lines):
                            desc = extract_description(content[frontmatter_match.end():])
                            fm_lines.append(f"description: \"{desc}\"")
                            needs_update = True
                        
                        if needs_update:
                            new_fm = "\n".join(fm_lines)
                            new_content = content[:frontmatter_match.start(1)] + new_fm + content[frontmatter_match.end(1):]
                            with open(skill_md, "w", encoding="utf-8") as f:
                                f.write(new_content)
                            print(f"✔ Updated frontmatter of skill: {item}")

def process_rules():
    if not os.path.exists(RULES_DIR):
        print(f"Directory not found: {RULES_DIR}")
        return
        
    if not os.path.exists(WORKFLOWS_DIR):
        os.makedirs(WORKFLOWS_DIR, exist_ok=True)

    print("\nProcessing Rules to Workflows...")
    for root, dirs, files in os.walk(RULES_DIR):
        for file in files:
            if file.endswith(".md"):
                rel_path = os.path.relpath(root, RULES_DIR)
                if rel_path == ".":
                    category = ""
                else:
                    # Sanitize folder path for the new filename prefix
                    category = rel_path.replace(os.sep, "-").replace("_", "-") + "-"
                
                # if category is rules, ignore (rules inside rules?)
                if category == "rules-":
                    category = ""
                
                new_filename = f"rule-{category}{file}"
                # clean up double dashes
                new_filename = new_filename.replace("--", "-")
                
                src_path = os.path.join(root, file)
                dst_path = os.path.join(WORKFLOWS_DIR, new_filename)
                
                with open(src_path, "r", encoding="utf-8") as f:
                    content = f.read()

                if not content.lstrip().startswith("---"):
                    desc = extract_description(content)
                    yaml_frontmatter = f"---\ndescription: \"{desc}\"\n---\n"
                    new_content = yaml_frontmatter + content
                else:
                    new_content = content # Keep as is if it has frontmatter, maybe update it?
                    frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
                    if frontmatter_match:
                        fm = frontmatter_match.group(1)
                        if not any(l.startswith('description:') for l in fm.split('\n')):
                            desc = extract_description(content[frontmatter_match.end():])
                            new_fm = fm + f"\ndescription: \"{desc}\""
                            new_content = content[:frontmatter_match.start(1)] + new_fm + content[frontmatter_match.end(1):]

                with open(dst_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"✔ Converted to workflow: {new_filename}")

if __name__ == "__main__":
    process_skills()
    process_rules()
    print("\nDone!")

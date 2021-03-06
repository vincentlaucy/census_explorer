import config
import sh
import os
from os import path
import json

sh.mkdir('-p', config.DIR_TRANSLATION)

# Formst:
# [ (prefix, path), ...]
sources = [
    ('area', path.join(config.DIR_DATA_GEO_NAME, 'translation-areas.json')),
    ('district', path.join(config.DIR_DATA_GEO_NAME, 'translation-districts.json')),
    ('region', path.join(config.DIR_DATA_GEO_NAME, 'translation-regions.json')),
    ('column', path.join(config.DIR_DATA_CLEAN_JSON, 'translation-column.json')),
    ('row', path.join(config.DIR_DATA_CLEAN_JSON, 'translation-row.json')),
    ('table', path.join(config.DIR_DATA_CLEAN_JSON, 'translation-table.json')),
]

def gen_one_language(sources, lang_code, fn_output):
    d =  {}
    sh.mkdir('-p', os.path.dirname(fn_output))
    for (name, path) in sources:
        j = json.load(open(path))
        identifiers = j.keys()
        #print identifiers
        canonical_names = [v[lang_code] for v in j.values()]
        d[name] = dict(zip(identifiers, canonical_names))
    json.dump(d, open(fn_output, 'w'))
    return d

def main():
    gen_one_language(sources, 'E', path.join(config.DIR_TRANSLATION, 'en-US', 'generated_ns-translation.json'))
    gen_one_language(sources, 'E', path.join(config.DIR_TRANSLATION, 'dev', 'generated_ns-translation.json'))
    gen_one_language(sources, 'S', path.join(config.DIR_TRANSLATION, 'zh-CN', 'generated_ns-translation.json'))
    gen_one_language(sources, 'T', path.join(config.DIR_TRANSLATION, 'zh-HK', 'generated_ns-translation.json'))
    gen_one_language(sources, 'T', path.join(config.DIR_TRANSLATION, 'zh-TW', 'generated_ns-translation.json'))
    
if __name__ == '__main__':
    main()

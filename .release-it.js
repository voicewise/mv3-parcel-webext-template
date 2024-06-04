module.exports = {
    'git': {
        'requireCleanWorkingDir': true,
        'commitMessage': 'v${version}',
        'pushRepo': 'origin',
        'tagName': 'v${version}',
        'requireCommits': true,
    },
    'github': {
        'release': true,
        'releaseName': 'v${version}',
        'tokenRef': 'GITHUB_TOKEN',
        'assets': ['releases/*-v${version}.zip'],
    },
    'plugins': {
        '@release-it/conventional-changelog': {
            'infile': 'CHANGELOG.md',
            'ignoreRecommendedBump': true,
            'preset': {
                'name': 'conventionalcommits',
                'types': [
                    {
                        'type': 'feat',
                        'section': 'Features',
                    },
                    {
                        'type': 'fix',
                        'section': 'Bug Fixes',
                    },
                ],
            },
        },
    },
    'npm': {
        'publish': false,
    },
    'hooks': {
        // bump a version in the manifest.json to be the same as in the package.json
        'before:bump': ['dot-json src/manifest.json version "${version}"'],
        'after:bump': ['npm run build'],
        'after:release': [
            'echo Successfully released ${name} v${version} to ${repo.repository}',
            'opener https://${repo.host}/${repo.repository}/releases/tag/v${version}',
        ],
    },
};

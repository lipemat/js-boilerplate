## Source Files

Some files cannot be TS because JEST will fail to load them when they are included in the JEST configuration generation.

To update the finished file, run the `build` command.

The built files are committed to the repository because the definitions within them are required by the `config` helper which fails during build if the files are not present.

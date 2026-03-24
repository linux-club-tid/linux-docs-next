{
inputs = {
  nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  common.url  = "path:../../nix-common";  # または Git URL
};

outputs = { self, nixpkgs, common }:
  let
    system = "x86_64-linux";
    pkgs   = import nixpkgs { inherit system; };
    shells = common.devShells.${system};
  in {
    devShells.${system} = {
      default = shells.node;
    };
  };
}
